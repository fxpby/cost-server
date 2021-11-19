/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1636887529664_2752';

  // add your middleware config here
  config.middleware = [];

  // 白名单配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  // 自定义加密字符串
  config.jwt = {
    secret: 'fxpby',
  };

  config.multipart = {
    mode: 'file',
  };

  config.cors = {
    origin: '*', // 允许所有跨域访问
    credentials: true, // 允许 cookie 跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '120.55.99.110',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '13352029252',
      // 数据库名
      database: 'egg-cost',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  exports.customLoader = {
    utils: {
      directory: 'app/utils',
      inject: 'app',
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload',
  };

  return {
    ...config,
    ...userConfig,
  };
};
