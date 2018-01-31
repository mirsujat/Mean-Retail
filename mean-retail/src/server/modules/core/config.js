'use strict';
//exports.Env = 'dev' || 'build';
exports.hostname = process.env.hostname || 'localhost';

exports.port = process.env.PORT || 8080;
exports.mongodb = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/drywall'
};
exports.companyName = 'Arthur Kao';
exports.projectName = 'Angular Drywall';
exports.systemEmail = 'sujatbd09@gmail.com';
exports.cryptoKey = 'k3yb0ardc4t';
exports.loginAttempts = {
  forIp: 50,
  forIpAndUser: 7,
  logExpiration: '20m'
};
exports.requireAccountVerification = false;
exports.smtp = {
  from: {
    name: process.env.SMTP_FROM_NAME || exports.projectName +' Mean Retail',
    address: process.env.SMTP_FROM_ADDRESS || 'sujatbd09@gmail.com'
  },
  credentials: {
    user: process.env.SMTP_USERNAME || 'sujatbd09@gmail.com',
    password: process.env.SMTP_PASSWORD || 'nml357412',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    ssl: true
  }
};
exports.oauth = {
  twitter: {
    // Not yet implemented
    key: process.env.TWITTER_OAUTH_KEY || '',
    secret: process.env.TWITTER_OAUTH_SECRET || ''
  },
  facebook: {
    key: process.env.FACEBOOK_OAUTH_KEY || '602352173299753',
    secret: process.env.FACEBOOK_OAUTH_SECRET || '9910167fdb1fe2b99a81c011c9420ee4',
    callback: process.env.FACEBOOK_OAUTH_CALLBACK_URL || 'http://localhost:8080/login/facebook/callback'
  },
  github: {
    // Not yet implemented
    key: process.env.GITHUB_OAUTH_KEY || '',
    secret: process.env.GITHUB_OAUTH_SECRET || ''
  },
  google: {
    key: process.env.GOOGLE_OAUTH_KEY || '342435889068-s12d70apmgseh3pjnq7ir9a077jct2aq.apps.googleusercontent.com',
    secret: process.env.GOOGLE_OAUTH_SECRET || '3Tzx1iIId_O_0KyU2kKGbyQj',
    callback: process.env.GOOGLE_OAUTH_CALLBACK_URL || 'http://localhost:8080/login/google/callback'
  },
  tumblr: {
    // Not yet implemented
    key: process.env.TUMBLR_OAUTH_KEY || '',
    secret: process.env.TUMBLR_OAUTH_SECRET || ''
  }
};
