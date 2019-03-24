package de.rockyj.wortschatz.utils

import de.rockyj.wortschatz.configuration.DataSource
import de.rockyj.wortschatz.configuration.GenericConfiguration
import org.flywaydb.core.Flyway
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach

open class DBTest {

    lateinit var dataSource: DataSource

    @BeforeEach
    fun setupDataSource() {
        val jdbcURL = "jdbc:sqlite:/tmp/wortschatz_qa.db"
        val maxPoolSize = 10

        val genericConfiguration: GenericConfiguration = object : GenericConfiguration {
            override fun <T> get(key: String): T {
                return when (key) {
                    "maxPoolSize" -> maxPoolSize as T
                    else -> 10 as T
                }
            }
        }
        val secretsConfiguration: GenericConfiguration = object : GenericConfiguration {
            override fun <T> get(key: String): T {
                return when (key) {
                    "dbURL" -> jdbcURL as T
                    else -> "" as T
                }
            }
        }

        dataSource = DataSource(genericConfiguration, secretsConfiguration)
        Flyway.configure().dataSource(dataSource.getHikariDataSource()).load().migrate()
    }

    @AfterEach
    fun cleanupDB() {
        Flyway.configure().dataSource(dataSource.getHikariDataSource()).load().clean()
    }
}
