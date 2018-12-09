var Picture = require('../../models/picture');

beforeEach(function(done){
    Picture.collection.remove();

    var picture1 = new Picture({
        _id: '5bcde76cfb6fc060274aecb2',
        name: 'Fire1',
        contentTitle: '',
        content: '',
        comment: [],
        url: '../../static/resources/Fire.jpg',
        userid: '5bcde909fb6fc060274aedf5',
        upvote: 2
    });
    var picture2 = new Picture({
        _id: '5bcde78efb6fc060274aecbb',
        name: 'Fire2',
        contentTitle: '',
        content: '',
        comment: [],
        url: '../../static/resources/Fire.jpg',
        userid: '5bcde909fb6fc060274aedf5',
        upvote: 3
    });
    var picture3 = new Picture({
        _id: '5bcde7e0fb6fc060274aecfe',
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

    done();
});



