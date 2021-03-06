var chai      = require('chai')
  , expect    = chai.expect
  , Skytap    = require('../lib/skytap')
  , nockspect = require('./util/nockspect')
  , _         = require('underscore');

describe('Skytap.vms', function () {
  var skytap = Skytap.init({ username: 'foo', token: 'bar' });

  describe('.get', function () {
    it('requests to get a vm from a template', function () {
      return nockspect(function (nock) {
        nock.get('/templates/1/vms/2').reply(200);
        return _.bind(skytap.vms.get, skytap.vms, {
          template_id: 1,
          vm_id: 2
        });
      });
    });

    it('requests to get a vm from an environment', function () {
      return nockspect(function (nock) {
        nock.get('/configurations/1/vms/2').reply(200);
        return _.bind(skytap.vms.get, skytap.vms, {
          configuration_id: 1,
          vm_id: 2
        });
      });
    });
  });

  describe('.update', function () {
    var body = {
      vm_data: {
        foo: 'bar'
      }
    };

    it('requests to update a vm in a template', function () {
      return nockspect(function (nock) {
        nock.put('/templates/1/vms/2', body).reply(200);
        return _.bind(skytap.vms.update, skytap.vms, _.extend({
          template_id: 1,
          vm_id: 2
        }, body));
      });
    });

    it('requests to update a vm in an environment', function () {
      return nockspect(function (nock) {
        nock.put('/configurations/1/vms/2', body).reply(200);
        return _.bind(skytap.vms.update, skytap.vms, _.extend({
          configuration_id: 1,
          vm_id: 2
        }, body));
      });
    });
  });

  describe('.del', function () {
    it('requests to delete a vm from a template', function () {
      return nockspect(function (nock) {
        nock.delete('/templates/1/vms/2').reply(200);
        return _.bind(skytap.vms.del, skytap.vms, {
          template_id: 1,
          vm_id: 2
        });
      });
    });

    it('requests to delete a vm from an environment', function () {
      return nockspect(function (nock) {
        nock.delete('/configurations/1/vms/2').reply(200);
        return _.bind(skytap.vms.del, skytap.vms, {
          configuration_id: 1,
          vm_id: 2
        });
      });
    });
  });

  describe('.userdata', function () {
    it('requests to get userdata from a vm in a template', function () {
      return nockspect(function (nock) {
        nock.get('/templates/1/vms/2/user_data').reply(200);
        return _.bind(skytap.vms.userdata, skytap.vms, {
          template_id: 1,
          vm_id: 2
        });
      });
    });

    it('requests to get userdata from from a vm in an environment', function () {
      return nockspect(function (nock) {
        nock.get('/configurations/1/vms/2/user_data').reply(200);
        return _.bind(skytap.vms.userdata, skytap.vms, {
          configuration_id: 1,
          vm_id: 2
        });
      });
    });
  });

  describe('.updateUserdata', function () {
    var body = {
      data: {
        foo: 'bar'
      }
    };

    it('requests to update userdata in a vm in a template', function () {
      return nockspect(function(nock) {
        nock.put('/templates/1/vms/2/user_data', body).reply(200);
        return _.bind(skytap.vms.updateUserdata, skytap.vms, _.extend({
          template_id: 1,
          vm_id: 2
        }, body));
      });
    });

    it('requests to update userdata in a vm in an environment', function () {
      return nockspect(function (nock) {
        nock.put('/configurations/1/vms/2/user_data', body).reply(200);
        return _.bind(skytap.vms.updateUserdata, skytap.vms, _.extend({
          configuration_id: 1,
          vm_id: 2
        }, body));
      });
    });
  });
});
