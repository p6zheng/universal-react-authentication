const config = {
  mongo: {
    devUrl: 'mongodb://localhost:27017/authentication_DEV',
    prodUrl: 'mongodb://localhost:27017/authentication_PROD'
  },
  jwt: {
    secret: 'lalala'
  },
  github: {
    id: 'cb448b1d4f0c743a1e36',
    secret: '815aa4606f476444691c5f1c16b9c70da6714dc6'
  },
  facebook: {
    id: '754220301289665',
    secret: '41860e58c256a3d7ad8267d3c1939a4a'
  },
  port: process.env.PORT || 3000,
};

export default config;