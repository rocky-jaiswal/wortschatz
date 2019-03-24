package de.rockyj.wortschatz.repositories

import de.rockyj.wortschatz.configuration.DataSource
import org.jdbi.v3.core.Jdbi

class DB(private val dataSource: DataSource) {

    fun getJdbi(): Jdbi {
        val jdbi = Jdbi.create(dataSource.getHikariDataSource())
        jdbi.installPlugins()
        return jdbi
    }
}
