const dbConfig = { client: 'sqlite3',
  useNullAsDefault: true,
  connection: { filename: '/home/rockyj/tmp/db/wortschatz_dev.db' },
  migrations: { directory: './db/migrations', tableName: 'knex_migrations' }
}

module.exports = dbConfig;
