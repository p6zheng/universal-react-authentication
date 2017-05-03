export default {
  cookie: {
    secret: process.env.COOKIE_SECRET
  },
  session: {
    secret: process.env.SESSION_SECRET
  },
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 3000
  },
  mongo: {
    url: 'mongodb://pengfei:Z_pf19941201@ds019756.mlab.com:19756/database-test1'
  },
  auth: {
    github: {
      id: process.env.GITHUB_ID,
      secret: process.env.GITHUB_SECRET
    },
    facebook: {
      id: process.env.FACEBOOK_ID,
      secret: process.env.FACEBOOK_SECRET
    },
    google: {
      id: process.env.GOOGLE_ID,
      secret: process.env.GOOGLE_SECRET
    },
    jwt: {
      secret: process.env.JWT_SECRET
    }
  },
  log: {
    console: 'error',
    file: 'error',
    color: false
  }
};