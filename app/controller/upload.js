'use strict';

const fs = require('fs');
const dayjs = require('dayjs');
const mkdirp = require('mkdirp');
const path = require('path');

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async singleUpload() {
    const { ctx } = this;

    const file = ctx.request.files[0];

    // 存放资源路径
    let uploadDir = '';

    try {
      const item = fs.readFileSync(file.filepath);
      // 1.获取当前日期
      const day = dayjs().format('YYYYMMDD');
      // 2.创建图片保存路径
      const saveDir = path.join(this.config.uploadDir, day);
      const date = Date.now();
      // 不存在就创建目录
      await mkdirp(saveDir);
      // 返回图片保存的路径
      uploadDir = path.join(saveDir, date + path.extname(file.filename));
      // 写入文件夹
      fs.writeFileSync(uploadDir, item);
    } finally {
      // 清除临时文件
      ctx.cleanupRequestFiles();
    }

    ctx.body = {
      code: 200,
      msg: '上传成功',
      data: uploadDir.replace(/app/g, ''),
    };
  }
}

module.exports = UploadController;
