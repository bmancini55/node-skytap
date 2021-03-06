var chai      = require('chai')
  , expect    = chai.expect
  , Skytap    = require('../lib/skytap')
  , nockspect = require('./util/nockspect')
  , _         = require('underscore');

describe('Skytap.templates', function () {
  var skytap = Skytap.init({ username: 'foo', token: 'bar' });

  describe('.list', function () {
    it('requests a list of templates', function () {
      return nockspect(function (nock) {
        nock.get('/templates').reply(200);
        return _.bind(skytap.templates.list, skytap.templates);
      });
    });

    it('takes optional parameters', function () {
      return nockspect(function (nock) {
        nock.get('/templates?foo=bar').reply(200);
        return _.bind(skytap.templates.list, skytap.templates, {
          foo: 'bar'
        });
      });
    });
  });

  describe('.get', function () {
    it('requests details of a template', function () {
      return nockspect(function (nock) {
        nock.get('/templates/1').reply(200);
        return _.bind(skytap.templates.get, skytap.templates, {
          template_id: 1
        });
      });
    });
  });

  describe('.create', function () {
    it('requests to create a template', function () {
      var body = {
        template_data: {
          foo: 'bar'
        }
      };

      return nockspect(function (nock) {
        nock.post('/templates', body).reply(200);
        return _.bind(skytap.templates.create, skytap.templates, body);
      });
    });
  });

  describe('.update', function () {
    it('requests to update a template', function () {
      var body = {
        template_data: {
          foo: 'bar'
        }
      };

      return nockspect(function (nock) {
        nock.put('/templates/1', body).reply(200);
        return _.bind(skytap.templates.update, skytap.templates, _.extend({
          template_id: 1
        }, body));
      });
    });
  });

  describe('.del', function () {
    it('requests to delete a template', function () {
      return nockspect(function (nock) {
        nock.delete('/templates/1').reply(200);
        return _.bind(skytap.templates.del, skytap.templates, {
          template_id: 1
        });
      });
    });
  });

  describe('.all', function () {
    it('requests all available templates', function () {
      var user1tpls = [ { name: 'foo' } ]
        , user2tpls = [ { name: 'bar' }, { name: 'baz' } ];

      return nockspect(function (nock) {
        nock
          .get('/users').reply(200, [
            { id: 1 },
            { id: 2 }
          ])
          .get('/users/1').reply(200, { templates: user1tpls })
          .get('/users/2').reply(200, { templates: user2tpls });

        return _.bind(skytap.templates.all, skytap.templates);
      }, function (result) {
        expect(result).to.eql(user1tpls.concat(user2tpls));
      });
    });
  });
});
