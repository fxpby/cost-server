'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {

  it('should POST /api/user/register', () => {
    return app.httpRequest()
      .post('/api/user/register') // POST请求
      .send({ username: `olu-${new Date()}`, password: '123456' }) // post body
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, '200');
      });
  });

});
