// Load modules

var Lab = require('lab'),
    Users = require('../'),
    Nock = require('nock'),

    // Declare internals
    internals = {},

    // Configs
    orchestrateUrl = 'https://api.orchestrate.io:443',
    baseUri = '/v0/users',

    // Test aliases
    expect = Lab.expect,
    before = Lab.before,
    beforeEach = Lab.beforeEach,
    after = Lab.after,
    afterEach = Lab.afterEach,
    describe = Lab.experiment,
    it = Lab.test,
    assert = Lab.assert;

describe('users-lib', function () {
    describe('get', function(){
        it('returns a mapped user', function(done){
            var users = new Users();

            Nock(orchestrateUrl)
            .get(baseUri + '/123')
            .replyWithFile(200, __dirname + '/fixtures/user.json');

            users.get({ id: '123' }, function(err, user){
                expect(user).to.have.property('id');
                expect(user).to.have.property('provider');
                expect(user).to.have.property('displayName');
                expect(user).to.have.property('email');
                expect(user).to.have.property('avatar');

                done();
            });
        });

        it('returns an error if retrieving a user fails', function(done){
            var users = new Users();

            Nock(orchestrateUrl)
            .get(baseUri + '/123')
            .reply(500);

            users.get({ id: '123' }, function(err, user){
                expect(err).to.exist;

                done();
            });
        });
    });

    describe('create', function(){
        it('returns the id of the new object', function(done){
            var users = new Users();

            Nock(orchestrateUrl)
            .put(baseUri + '/123')
            .reply(200);

            users.create({
                id: '123',
                model: {
                    name: 'test'
                }
            }, function(err, id){
                expect(id).to.equal('123');

                done();
            });
        });

        it('returns an error if creating a user fails', function(done){
            var users = new Users();

            Nock(orchestrateUrl)
            .put(baseUri + '/123')
            .reply(500);

            users.create({
                id: '123',
                model: {
                    name: 'test'
                }
            }, function(err, user){
                expect(err).to.exist;

                done();
            });
        });
    });

    describe('update', function(){
        it('returns the id of the new object', function(done){
            var users = new Users();

            Nock(orchestrateUrl)
            .put(baseUri + '/123')
            .reply(200);

            users.update({
                id: '123',
                model: {
                    name: 'test'
                }
            }, function(err, id){
                expect(id).to.equal('123');

                done();
            });
        });

        it('returns an error if updating a user fails', function(done){
            var users = new Users();

            Nock(orchestrateUrl)
            .put(baseUri + '/123')
            .reply(500);

            users.update({
                id: '123',
                model: {
                    name: 'test'
                }
            }, function(err, user){
                expect(err).to.exist;

                done();
            });
        });
    });

    describe('destroy', function(){
        it('returns a null response', function(done){
            var users = new Users();

            Nock(orchestrateUrl)
            .delete(baseUri + '/123?purge=true')
            .reply(200);

            users.destroy({
                id: '123'
            }, function(err){
                expect(err).to.be.a('null');

                done();
            });
        });

        it('returns an error if deleting a user fails', function(done){
            var users = new Users();

            Nock(orchestrateUrl)
            .delete(baseUri + '/123?purge=true')
            .reply(500);

            users.destroy({
                id: '123'
            }, function(err){
                expect(err).to.exist;

                done();
            });
        });
    });
});

