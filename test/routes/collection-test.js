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

describe('Collection', () => {
    describe('GET /collection', () => {
        it('should return all the collections in an array', function (done) {
            chai.request(server)
                .get('/collection')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.equal(3);
                    let result = _.map(res.body, (board) => {
                        return {
                            category: board.category,
                            name: board.name
                        }
                    });
                    expect(result).to.include({category: 'Animation', name: 'Japanese illustration'});
                    expect(result).to.include({category: 'sketch', name: 'Black and White'});
                    expect(result).to.include({category: 'photography', name: 'Girls!'});
                    Collection.collection.remove();
                    Picture.collection.remove();
                    User.collection.remove();
                    done();
                });
        });
    });
    describe('GET /collection/names/:name', () => {
        it('should return several collections which matches the name', function (done) {
            chai.request(server)
                .get('/collection/names/illustration')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let  result = _.map(res.body, (board) => {
                        return { category: board.category,
                            name: board.name }
                    });
                    expect(result).to.include( { category: 'Animation', name: 'Japanese illustration'  } );
                    done();
                });
        });
        it('should return a message for invalid collection name ', function (done) {
            chai.request(server)
                .get('/collection/names/Marvel')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Collection NOT Found!' ) ;
                    Collection.collection.remove();
                    Picture.collection.remove();
                    User.collection.remove();
                    done();
                });
        });
    });

});