# Assignment 1 - API testing and Source Control.

Name: ... Zhiwen Han ...

## Overview.

 Three models: collection, picture and user. The relation among these three is that user creates collections,
 and collection has pictures. Beside basic CRUD, for example, if a collection is deleted, the pictures in that
 should also be deleted. You can get information about collection by finding a user or picture.

## API endpoints.

 + GET /collection - Get all collections.
 + GET /collection/names/:name - Get collections by a particular name.
 + POST /collection - Insert a new collection.
 + PUT /collection/:id/attentionAdd - Change the number of follow in a particular collection.
 + DELETE /collection - Delete a collection by a particular ID.

 + GET /picture - Get all pictures.
 + GET /picture/collection/:id - Get a picture by a particular ID.
 + GET /picture/names/:name - Get pictures by a particular name.
 + GET /picture/collection/:id - Get a collection where a picture exists.
 + POST /picture - Insert a new picture.
 + PUT /picture/:id/addComment - Add a comment to a particular picture.
 + DELETE /picture/:id - Delete a picture.

 + GET /user - Get all users.
 + GET /user/:email - Get a user by a particular email.
 + GET /user/names/:name - Get users by a particular name.
 + POST /user - Insert a new user.
 + PUT /user/:id/addFollow - Follow + 1 in a particular user.
 + PUT /user/:id/removeFollow - Follow - 1 in a particular user.


## Data storage.

 CollectionSchema = new mongoose.Schema({
         category: String,
         name: String,
         size: Number,
         follow: Number
     },
     { collection: 'collections' });

 PictureSchema = new mongoose.Schema({
         collectionid: {type: mongoose.Schema.ObjectId, ref: 'collection'},
         name: String,
         describe: {type: String, default: null},
         comment: []
     },
     {collection: 'pictures'});

 UserSchema = new mongoose.Schema({
         name: {type: String, required: true},
         password: {type: String, required: true},
         email: {type: String, unique: true},
         collectionid: [{type: mongoose.Schema.ObjectId, unique: true, ref: 'collection'}],
         fans: [{type: mongoose.Schema.ObjectId, unique: true}],
         follows: [{type: mongoose.Schema.ObjectId, unique: true}]
     },
     {collection: 'users'});


## Sample Test execution.

        $ npm test

        > pictureweb-02@0.0.0 test /Users/Soundtrack/Workspace/WebStrom_Workspace/pictureWeb-05
        > NODE_ENV=test mocha test/routes/user-test.js

          User
              GET /user
          (node:718) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
          Connected to Database: mongodb://localhost:27017/pictureWebDB
                ✓ should return all the users in an array (73ms)
              GET /user/:email
                ✓ should return a user which matched the email (273ms)
                ✓ should return a message for invalid user email
              GET /user/names/:name
          (node:718) DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use collection.countDocuments or collection.estimatedDocumentCount instead
                ✓ should return a message for invalid user name
                ✓ should return a user which matched the name
              POST /user
                ✓ should return a message and update users
              PUT /user/:id/addFollow
          (node:718) DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.
                ✓ should return a message and update users
              PUT /user/:id/removeFollow
                ✓ should return a message and update users


        8 passing (533ms)

        $

        $ npm test

        > pictureweb-02@0.0.0 test /Users/Soundtrack/Workspace/WebStrom_Workspace/pictureWeb-05
        > NODE_ENV=test mocha test/routes/collection-test.js

          Collection
              GET /collection
          (node:805) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
          Connected to Database: mongodb://localhost:27017/pictureWebDB
                ✓ should return all the collections in an array (73ms)
              GET /collection/names/:name
          (node:805) DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use collection.countDocuments or collection.estimatedDocumentCount instead
                ✓ should return several collections which matches the name
                ✓ should return a message for invalid collection name
              POST /collection
                ✓ should return confirmation message and update datastore
              PUT /collection/:id/attentionAdd
                ✓ should return a message and follow + 1
                ✓ should return a message for invalid collection id
              DELETE /collection/:id
                ✓ should return a message for invalid collection id
                ✓ should return a message and update collections


        8 passing (261ms)

        $

        $ npm test

        > pictureweb-02@0.0.0 test /Users/Soundtrack/Workspace/WebStrom_Workspace/pictureWeb-05
        > NODE_ENV=test mocha test/routes/picture-test.js

        Picture
            GET /picture
        (node:854) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
        Connected to Database: mongodb://localhost:27017/pictureWebDB
              ✓ should return all the pictures in an array (273ms)
            GET /picture/collection/:id
              ✓ should return a collection where the picture exists (238ms)
              ✓ should return a message for invalid id
            GET /picture/names/:name
        (node:854) DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use collection.countDocuments or collection.estimatedDocumentCount instead
              ✓ should return a picture which matched the name (286ms)
              ✓ should return a message for invalid picture name
            POST /picture
              ✓ should return confirmation message and update datastore (259ms)
            PUT /picture/:id/addComment
              ✓ should return a mesage for invaild id (255ms)
              ✓ should return a message and update the comment of the picture
            DELETE /picture/:id
              ✓ should return a message for invalid collection id
              ✓ should return a message and update pictures (270ms)


        10 passing (2s)

        $

[ Markdown Tip: By indenting the above listing, GitHub will display it in a 'box' and preserve any formatting.]

## Extra features.

 There are three test files for each route. The relation among the three should be tested as well. For example,
 as the collection is deleted, all the pictures in this collection should also be deleted, so I test whether the
 pictures is removed from the database. Besides, each user have follows and fans, which means if user1 follow user2
 (user1 follow + 1), and user2 will have a new fan who is user1 (user2 fan + 1), I just test whether the ids are really
 added to both lists.
