let Picture = require('../models/picture');
let express = require('express');
let router = express.Router();

//Find all pictures
router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Picture.find(function(err, pic) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(pic, null, 5));
    });
};

//Find by name
router.findByName = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var keyword = req.params.name;
    var _filter = {
        $or: [
            {name: {$regex: keyword, $options: '$i'}}
        ]
    };
    var count = 0;
    Picture.count(_filter, function(err, pic){
        if (err){
            res.json({errmsq : err});
        }else{
            count = pic;
        }
    });

    Picture.find(_filter).limit(10).sort({'_id' : -1}).exec(function(err, pic){
        if (err || pic.length == 0){
            res.json({message: 'Picture NOT Found!', errmsq : err});
        }else{
            res.send(JSON.stringify(pic, null, 5));
        }
    });
};


//Add a picture
router.addPicture = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var picture = new Picture();
    var picDate = new Date();

    picture.name = req.body.name;
    picture.contentTitle = req.body.contentTitle;
    picture.content = req.body.content;
    picture.date = picDate.toLocaleString();
    picture.comment = req.body.comment;
    picture.url = req.body.url;
    picture.userid = req.body.userid;

    picture.save(function(err) {
        if (err)
            res.json({ message: 'Picture NOT Added!', errmsg : err } );
        else{
            res.json({ message: 'Picture Successfully Added!'});
        }
    });
};

//Delete a picture
router.deletePicture = (req, res) => {
    //Delete a selected picture by id
    Picture.findByIdAndRemove({'_id' : req.params.id})
        .exec(function(err, pic) {
            if (err)
                res.json({ message: 'No such Picture, Picture NOT DELETED!', errmsg : err } );
            else{
                res.json({ message: 'Picture Successfully DELETED!'});
            }
        });
};

//Add a comment
router.addComment = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Picture.update({_id: req.params.id}, {$addToSet: {comment: [req.body.comment]}}, function(err, pic) {
        if (err)
            res.json({ message: 'Picture NOT Found!'} );
        else {
            res.json({ message: 'Comment Saved!'});
        }
    });
};

//Change information
router.changeInfo = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Picture.findById(req.params.id, function(err, pic) {
        if (err)
            res.json({ message: 'Picture NOT Found!', errmsg : err } );
        else {
            pic.name = req.body.name;
            pic.contentTitle = req.body.contentTitle;
            pic.content = req.body.content;
            pic.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Changes Saved!', data: pic});
            });
        }
    });
};

//Get content title
router.getContentTitle = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Picture.findById(req.params.id, function(err, pic) {
        if (err)
            res.json({message: 'Picture NOT Found!', errmsg : err});
        else {
            res.json(pic.contentTitle);
        }
    });
};

//Get content
router.getContent = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Picture.findById(req.params.id, function(err, pic) {
        if (err)
            res.json({message: 'Picture NOT Found!', errmsg : err});
        else {
            res.json(pic.content);
        }
    });
};


module.exports = router;