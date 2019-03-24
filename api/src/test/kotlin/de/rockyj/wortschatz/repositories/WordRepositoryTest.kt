package de.rockyj.wortschatz.repositories

import de.rockyj.wortschatz.utils.DBTest
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class WordRepositoryTest : DBTest() {

    @Test
    fun `Basic DB Select`() {
        val jdbi = DB(super.dataSource)
        val words = WordRepository(jdbi).getAllWords()
        Assertions.assertEquals(0, words.size)
    }
}
