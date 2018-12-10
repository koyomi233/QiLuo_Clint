let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
var Picture = require('../../models/picture');

chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );


describe('Picture', () => {
    describe('GET /picture', () => {
        it('should return all the pictures in an array', function (done) {
            this.timeout(60000);
            var picture1 = new Picture({
                ObjectId: '5bcde76cfb6fc060274aecb2',
                name: 'Fire1',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 2
            });
            var picture2 = new Picture({
                ObjectId: '5bcde78efb6fc060274aecbb',
                name: 'Fire2',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 3
            });
            var picture3 = new Picture({
                ObjectId: '5bcde7e0fb6fc060274aecfe',
                name: 'Fire3',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 4
            });
            picture3.save();
            picture2.save();
            picture1.save();

            chai.request(server)
                .get('/picture')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(3);
                    let result = _.map(res.body, (pic) => {
                        return {
                            name: pic.name
                        };
                    });
                    expect(result).to.include({name: 'Fire1'});
                    expect(result).to.include({name: 'Fire2'});
                    expect(result).to.include({name: 'Fire3'});
                    Picture.collection.remove();
                    done();
                });
        });
    });

    describe('GET /picture/names/:name', () => {
        it('should return a picture which matched the name', function (done) {
            this.timeout(60000);
            var picture1 = new Picture({
                ObjectId: '5bcde76cfb6fc060274aecb2',
                name: 'Fire1',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 2
            });
            var picture2 = new Picture({
                ObjectId: '5bcde78efb6fc060274aecbb',
                name: 'Fire2',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 3
            });
            var picture3 = new Picture({
                ObjectId: '5bcde7e0fb6fc060274aecfe',
                name: 'Fire3',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 4
            });
            picture3.save();
            picture2.save();
            picture1.save();

            chai.request(server)
                .get('/picture/names/Fire1')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (pic) => {
                        return {
                            name: pic.name };
                    });
                    expect(result).to.include( { name: 'Fire1'  } );
                    done();
                });
        });
        it('should return a message for invalid picture name', function (done) {
            chai.request(server)
                .get('/picture/names/Marvel')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Picture NOT Found!' );
                    Picture.collection.remove();
                    done();
                });
        });
    });
    describe('POST /picture', () => {
        it('should return confirmation message and update datastore', function (done) {
            this.timeout(60000);
            var picture1 = new Picture({
                ObjectId: '5bcde76cfb6fc060274aecb2',
                name: 'Fire1',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 2
            });
            var picture2 = new Picture({
                ObjectId: '5bcde78efb6fc060274aecbb',
                name: 'Fire2',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 3
            });
            var picture3 = new Picture({
                ObjectId: '5bcde7e0fb6fc060274aecfe',
                name: 'Fire3',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 4
            });
            picture3.save();
            picture2.save();
            picture1.save();
            let pic = {
                name: 'Fire4',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 2
            };
            chai.request(server)
                .post('/picture')
                .send(pic)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message')
                        .equal('Picture Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/picture')
                .end(function(err, res) {
                    let result = _.map(res.body, (pic) => {
                        return { name: pic.name };
                    }  );
                    expect(result).to.include( { name: 'Fire4'  } );
                    Picture.collection.remove();
                    done();
                });
        });
    });
    describe('DELETE /picture/:id', () => {
        it('should return a message for invalid collection id', function (done) {
            this.timeout(60000);
            var picture1 = new Picture({
                ObjectId: '5bcde76cfb6fc060274aecb2',
                name: 'Fire1',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 2
            });
            var picture2 = new Picture({
                ObjectId: '5bcde78efb6fc060274aecbb',
                name: 'Fire2',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 3
            });
            var picture3 = new Picture({
                ObjectId: '5bcde7e0fb6fc060274aecfe',
                name: 'Fire3',
                contentTitle: '',
                content: '',
                comment: [],
                url: '../../static/resources/Fire.jpg',
                userid: '5bcde909fb6fc060274aedf5',
                upvote: 4
            });
            picture3.save();
            picture2.save();
            picture1.save();
            chai.request(server)
                .delete('/picture/00000000000000')
                .end(function(err, res) {
                    expect(res.body).to.have.property('message', 'No such Picture, Picture NOT DELETED!');
                    done();
                });
        });
        it('should return a message and update pictures', function (done) {
            chai.request(server)
                .delete('/picture/5bcde76cfb6fc060274aecb2')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message',
                        'Picture Successfully DELETED!');
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/picture')
                .end(function(err, res) {
                    let result = _.map(res.body, (pic) => {
                        return { name: pic.name };
                    }  );
                    expect(result).to.not.include( { name: 'Fire!' } );
                    Picture.collection.remove();
                    done();
                });
        });
    });
});