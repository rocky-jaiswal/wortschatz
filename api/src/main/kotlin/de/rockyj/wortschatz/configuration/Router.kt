package de.rockyj.wortschatz.configuration

import de.rockyj.wortschatz.AppRole
import de.rockyj.wortschatz.handlers.AuthHandler
import de.rockyj.wortschatz.handlers.RootHandler
import de.rockyj.wortschatz.handlers.WordsHandler
import io.javalin.Javalin
import io.javalin.security.SecurityUtil.roles
import org.koin.standalone.KoinComponent
import org.koin.standalone.get

class Router: KoinComponent {
    fun setup(app: Javalin) {
        val rootHandler: RootHandler = get()
        val wordsHandler: WordsHandler = get()
        val authHandler: AuthHandler = get()

        // Routes
        app.get("/",        { rootHandler.get(it) },    roles(AppRole.ANYONE))
        app.post("/auth",   { authHandler.create(it) }, roles(AppRole.ANYONE))
        app.get("/words",   { wordsHandler.index(it) }, roles(AppRole.USER))
    }
}
