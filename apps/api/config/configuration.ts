const configuration = () => ({
  database: {
    uri: process.env.DATABASE_URL || 'mongodb://localhost:27017/database',
  },
  eventstore: {
    category: process.env.EVENTSTORE_STREAM,
    connection: process.env.EVENTSTORE_URL || 'esdb://localhost:2113?tls=false',
    uri: process.env.KEYSTORE_URI || 'mongodb://localhost:27017/keystore',
  },
})

export default configuration
