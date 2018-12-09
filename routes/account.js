let Account = require('../models/user');
let express = require('express');
let router = express.Router();

//Find all users
router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Account.find(function(err, acc) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(acc, null, 5));
    });
}

//Find by email
router.findOneByEmail = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Account.find({ "email" : req.params.email },function(err, acc) {
        if (err || acc.length == 0)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(acc, null, 5));
    });
}

//Add a user
router.addUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var acc = new Account();

    acc.name = req.body.name;
    acc.password = req.body.password;
    acc.email = req.body.email;
    acc.introduction = req.body.introduction;
    acc.avator = req.body.avator;

    acc.save(function(err) {
        if (err)
            res.json({ message: 'User NOT Added!', errmsg : err } );
        else
            res.json({ message: 'User Successfully Added!', data: acc });
    });
}

//Delete a user
router.deleteUser = (req, res) => {
    Account.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'User NOT DELETED!', errmsg : err } );
        else{
            res.json({ message: 'User Successfully DELETED!'});
        }

    });
}

//Change avatar
router.changeAvatar = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Account.findById(req.params.id, function(err, acc) {
        if (err)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else {
            acc.avatar = req.body.avatar;
            acc.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Changes Saved!', data: acc});
            });
        }
    });
}

module.exports = router;