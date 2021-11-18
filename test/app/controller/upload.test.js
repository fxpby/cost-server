'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/upload.test.js', () => {
  it('POST /api/singleUpload 文件上传成功', () => {
    return app.httpRequest()
      .post('/api/singleUpload')
      .field('name', 'my awesome avatar')
      .attach('file', 'app/public/default/test1.png')
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, 200);
      });
  });

  it('POST /api/uploadByAliOss oss文件上传成功', () => {
    return app.httpRequest()
      .post('/api/uploadByAliOss')
      .field('name', 'my awesome avatar')
      .attach('file', 'app/public/default/test1.png')
      .expect(200)
      .then(response => {
        console.log(response);
        const res = JSON.parse(response.text);
        assert.equal(res.code, 200);
      });
  });

});
