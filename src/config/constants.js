const devConfig = {
  MONGO_URL: 'mongodb://127.0.0.1/blogapi-dev',
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/blogapi-test',

};

const prodConfig = {
  MONGO_URL: 'mongodb://127.0.0.1/blogapi-prod',

};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'production':
      return prodConfig;
    case 'test':
      return testConfig;
    default:
      return defaultConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
