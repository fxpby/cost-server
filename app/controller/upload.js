'use strict';

const fs = require('fs');
const dayjs = require('dayjs');
const mkdirp = require('mkdirp');
const path = require('path');
// const OSS = require('ali-oss');

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

  // 阿里云oss上传 收到阿里云安全中心检测警告，先注释了
  // async uploadByAliOss() {
  //   const ossInfo = {
  //     // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  //     region: '',
  //     // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  //     accessKeyId: '',
  //     accessKeySecret: '',
  //     // 填写Bucket名称。
  //     bucket: 'fxpby',
  //   };

  //   const client = new OSS(ossInfo);

  //   const { ctx } = this;
  //   const file = ctx.request.files[0];

  //   let result;

  //   try {
  //     // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
  //     // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
  //     // 上传文件到oss,第一个参数为文件存放地址+文件名，第二个是文件路径
  //     const date = Date.now();
  //     const pathAndFileName = `project/egg-cost/uploadAvatar/${date + path.extname(file.filename)}`;
  //     result = await client.put(pathAndFileName, file.filepath);
  //     console.log(result);
  //   } finally {
  //     ctx.cleanupRequestFiles();
  //   }

  //   ctx.body = {
  //     code: 200,
  //     msg: '上传成功',
  //     data: result,
  //   };
  // }


}

module.exports = UploadController;
