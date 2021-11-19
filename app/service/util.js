'use strict';

const Service = require('egg').Service;

class UtilService extends Service {

  // 获取 aliyun oss 配置
  async getOssConfig(str) {
    const { app } = this;

    try {
      const result = await app.mysql.get('config', { configName: str });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = UtilService;
