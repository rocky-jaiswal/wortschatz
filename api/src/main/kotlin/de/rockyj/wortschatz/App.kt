package de.rockyj.wortschatz

import de.rockyj.wortschatz.configuration.*
import de.rockyj.wortschatz.handlers.RootHandler
import de.rockyj.wortschatz.handlers.WordsHandler
import de.rockyj.wortschatz.repositories.DB
import de.rockyj.wortschatz.repositories.WordRepository
import de.rockyj.wortschatz.services.WordService
import io.javalin.Javalin
import org.flywaydb.core.Flyway
import org.koin.dsl.module.module
import org.koin.standalone.KoinComponent
import org.koin.standalone.StandAloneContext
import org.koin.standalone.get

val mainModule = module {
    single<GenericConfiguration>("configuration") { Configuration() }
    single<GenericConfiguration>("secrets") { Secrets() }
    single { DataSource(get(name = "configuration"), get(name = "secrets")) }
    single { DB(get()) }
    single { Router() }

    //Root
    single { RootHandler() }
    //Words
    single { WordRepository(get()) }
    single { WordService(get()) }
    single { WordsHandler(get()) }
}

class App : KoinComponent {
    fun run(app: Javalin) {
        // Migrate the DB
        val dataSource: DataSource = get()
        Flyway.configure().dataSource(dataSource.getHikariDataSource()).load().migrate()

        val router: Router = get()
        router.setup(app)
    }
}

fun main() {
    // Start DI
    StandAloneContext.startKoin(listOf(mainModule))

    // Javalin configuration
    val port = Configuration().get("port") as Int
    val corsOrigin = Configuration().get("corsOrigin") as String

    // Javalin setup
    val app = Javalin.create().apply {
        enableCorsForOrigin(corsOrigin)
        port(port)
    }.start()

    // Run the app
    App().run(app)
}
