package de.rockyj.wortschatz.handlers

import io.javalin.Context
import org.slf4j.LoggerFactory
import de.rockyj.wortschatz.services.WordService

class WordsHandler(private val wordService: WordService) {
    private val logger = LoggerFactory.getLogger(this::class.java.name)

    fun index(ctx: Context): Context {
        logger.info("Received request for words index path ...")
        return ctx.json(mapOf("words" to wordService.getAll()))
    }
}
