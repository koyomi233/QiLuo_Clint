let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
var User = require('../../models/account');

chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );

describe('User', () => {
    describe('GET /account', () => {
        it('should return all the users in an array', function (done) {
            this.timeout(60000);
            var user1 = new User({
                _id: '5bcde909fb6fc060274aedf5',
                name: 'hanzhiwen',
                email: '317657452@qq.com',
                password: '123456',
                introduction: '',
                avatar: '../../static/resources/Fire.jpg'
            });

            user1.save();

            chai.request(server)
                .get('/account')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (account) => {
                        return { name: account.name }
                    });
                    expect(result).to.include( { name: 'hanzhiwen' } );
                    User.collection.remove();
                    done();
                });
        });
    });

    describe('GET /account/emails/:email', () => {
        it('should return a message for invalid user email', function (done) {
            this.timeout(6000);
            var user1 = new User({
                ObjectId: '5bcde909fb6fc060274aedf5',
                name: 'hanzhiwen',
                email: '317657452@qq.com',
                password: '123456',
                introduction: '',
                avatar: '../../static/resources/Fire.jpg'
            });
            var user2 = new User({
                ObjectId: '5bcde933fb6fc060274aee1a',
                name: 'koyomi',
                email: '12345566@qq.com',
                password: '123456',
                introduction: '',
                avatar: '../../static/resources/Fire.jpg'
            });
            var user3 = new User({
                ObjectId: '5bcde96cfb6fc060274aee4c',
                name: 'Shinobu',
                email: '1123323232@qq.com',
                password: '123456',
                introduction: '',
                avatar: '../../static/resources/Fire.jpg'
            });

            user1.save();
            user2.save();
            user3.save();
            chai.request(server)
                .get('/account/emails/Marvel')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'User NOT Found!' );
                    done();
                });
        });
        it('should return a user which matched the email', function (done) {
            chai.request(server)
                .get('/account/emails/317657452@qq.com')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (account) => {
                        return { name: account.name,
                            email: account.email}
                    });
                    expect(result).to.include( { name: 'hanzhiwen', email: '317657452@qq.com'  } );
                    User.collection.remove();
                    done();
                });
        });
    });
    describe('POST /account', () => {
        it('should return a message and update users', function (done) {
            let user4 = {
                name: 'zack',
                email: 'zack12345@qq.com',
                password: '123456',
                introduction: '',
                avatar: '../../static/resources/Fire.jpg'
            };
            chai.request(server)
                .post('/account')
                .send(user4)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message')
                        .equal('User Successfully Added!' );
                    done();
                });
        });
        after(function(done){
            chai.request(server)
                .get('/account')
                .end(function(err, res) {
                    let result = _.map(res.body, (account) => {
                        return { name: account.name,
                            email: account.email}
                    });
                    expect(result).to.include( { name: 'zack', email: 'zack12345@qq.com' } );
                    User.collection.remove();
                    done();
                });
        });
    });
});