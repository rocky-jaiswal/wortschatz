package de.rockyj.wortschatz.services

import de.rockyj.wortschatz.models.Word
import de.rockyj.wortschatz.repositories.WordRepository

class WordService(private val wordRepository: WordRepository) {
    fun getAll(): List<Word> {
        return wordRepository.getAllWords()
    }
}
