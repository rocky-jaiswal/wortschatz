package de.rockyj.wortschatz

import de.rockyj.wortschatz.configuration.*
import de.rockyj.wortschatz.handlers.AuthHandler
import de.rockyj.wortschatz.handlers.RootHandler
import de.rockyj.wortschatz.handlers.WordsHandler
import de.rockyj.wortschatz.repositories.DB
import de.rockyj.wortschatz.repositories.WordRepository
import de.rockyj.wortschatz.services.WordService
import io.javalin.Context
import io.javalin.Javalin
import io.javalin.security.Role
import org.flywaydb.core.Flyway
import org.koin.dsl.module.module
import org.koin.standalone.KoinComponent
import org.koin.standalone.StandAloneContext
import org.koin.standalone.get

val mainModule = module {
    single<GenericConfiguration>("configuration") { Configuration() }
    single<GenericConfiguration>("secrets") { Secrets() }
    single { DataSource(get(name = "configuration"), get(name = "secrets")) }
    single { Authentication(get(name = "secrets")) }
    single { DB(get()) }
    single { Router() }

    // Root
    single { RootHandler() }
    // Auth
    single { AuthHandler(get()) }
    // Words
    single { WordRepository(get()) }
    single { WordService(get()) }
    single { WordsHandler(get()) }
}

internal enum class AppRole : Role {
    ANYONE, USER
}


class App : KoinComponent {
    fun init(app: Javalin) {
        // Migrate the DB
        val dataSource: DataSource = get()
        Flyway.configure().dataSource(dataSource.getHikariDataSource()).load().migrate()

        val router: Router = get()
        router.setup(app)
    }

    fun getUserRole(ctx: Context) : Role {
        val authentication: Authentication = get()
        val authenticated = authentication.verifyToken(ctx.header("Authorization") ?: "")
        return if(authenticated){
            AppRole.USER
        } else {
            AppRole.ANYONE
        }
    }
}

fun main() {
    // Start DI
    StandAloneContext.startKoin(listOf(mainModule))

    val app = App()

    // Javalin configuration
    val port = Configuration().get("port") as Int
    val corsOrigin = Configuration().get("corsOrigin") as String

    // Javalin setup
    val javalin = Javalin.create().apply {
        enableCorsForOrigin(corsOrigin)
        port(port)
        accessManager { handler, ctx, permittedRoles ->
            val userRole = app.getUserRole(ctx)
            if (permittedRoles.contains(userRole)) {
                handler.handle(ctx)
            } else {
                ctx.status(401).result("Unauthorized")
            }
        }
    }.start()

    // Initialize the app
    app.init(javalin)
}
