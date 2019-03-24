package de.rockyj.wortschatz.repositories

import de.rockyj.wortschatz.models.Word
import org.jdbi.v3.sqlobject.kotlin.onDemand
import org.jdbi.v3.sqlobject.statement.SqlQuery

internal interface WordDao {
    @SqlQuery("select * from words")
    fun listWords(): List<Word>
}

class WordRepository(private val db: DB) {
    fun getAllWords(): List<Word> {
        val dao = db.getJdbi().onDemand<WordDao>()
        return dao.listWords()
    }
}


