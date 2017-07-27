module.exports = {
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost/amazon_bay_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    }
  },

  development: {
    client: 'pg',
    connection: 'postgres://localhost/amazon_bay',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
     directory: './db/seeds/dev'
   }
  },

 production: {
   client: 'pg',
   connection: `${process.env.DATABASE_URL}?ssl=true`,
   migrations: {
     directory: './db/migrations',
   },
   useNullAsDefault: true,
   seeds: {
     directory: './db/seeds/dev',
   },
  }
};
