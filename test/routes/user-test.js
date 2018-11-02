let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
var Collection = require('../../models/collection');
var Picture = require('../../models/picture');
var User = require('../../models/user');

chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );

require('./db_globle');

describe('User', () => {
    describe('GET /user', () => {
        it('should return all the users in an array', function (done) {
            chai.request(server)
                .get('/user')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(3);
                    let result = _.map(res.body, (account) => {
                        return { name: account.name }
                    });
                    expect(result).to.include( { name: 'soundtrack' } );
                    expect(result).to.include( { name: 'koyomi' } );
                    expect(result).to.include( { name: 'Shinobu' } );

                    User.collection.remove();
                    Collection.collection.remove();
                    Picture.collection.remove();
                    done();
                });
        });
    });

});