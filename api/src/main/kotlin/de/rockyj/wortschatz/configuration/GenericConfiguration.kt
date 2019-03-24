package de.rockyj.wortschatz.configuration

interface GenericConfiguration {
    fun <T> get(key: String): T
}
