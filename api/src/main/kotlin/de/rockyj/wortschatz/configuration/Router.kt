package de.rockyj.wortschatz.configuration

import de.rockyj.wortschatz.handlers.RootHandler
import de.rockyj.wortschatz.handlers.WordsHandler
import io.javalin.Javalin
import org.koin.standalone.KoinComponent
import org.koin.standalone.get

class Router: KoinComponent {
    fun setup(app: Javalin) {
        val rootHandler: RootHandler = get()
        val wordsHandler: WordsHandler = get()

        // Routes
        app.get("/") { rootHandler.get(it) }
        app.get("/words") { wordsHandler.index(it) }
    }
}
