# Assignment 1 - API testing and Source Control.

Name: ... Zhiwen Han ...

## Overview.

...... A statement of the API's context and objectives (just a paragraph)........

## API endpoints.
 . . . . . List the API's endpoints and state the purpose of each . . . . 
 
 e.g.

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
. . . . This section is only relevant if your tests included the integration of MongoDB (or other database) with the API. It should specify the database schema, i.e. JSON document structure for each collection type in the MongoDB database.

 e.g.

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
. . . . . In this section include a listing of the output from running your tests, e.g.

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
. . . . Briefly state any extra features of your testing that you feel should be high-lighted . . . . .
