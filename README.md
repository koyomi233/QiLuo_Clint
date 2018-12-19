# Assignment 2 - Web API - Server.

Name: Zhiwen Han

Student No.:  20082239

## Overview.

 The complete project can be cloned or downloaded on https://github.com/koyomi233/QiLuo_Server.git

 Based on Assignment 1, there are some changes in Assignment 2: add
 some new attributes to account and picture, and delete some useless methods.
 Three models: board, picture and account. The relation among these three is that user creates boards,
 and boards collect pictures.

 If you want to use the client of this application, please turn to my QiLuo (https://github.com/koyomi233/QiLuo.git).

## API endpoints.

  + GET /picture - Get all pictures.
  + GET /picture/names/:name - Get pictures by a particular name.
  + GET /picture/:id/title - Get the title of a picture.
  + GET /picture/:id/content - Get the content of a picture
  + POST /picture - Insert a new picture.
  + PUT /picture/:id/addComment - Add a comment to a particular picture.
  + PUT /picture/:id/changeInfo - Change the information of a picture
  + DELETE /picture/:id - Delete a picture.

  + GET /account - Get all account.
  + GET /account/:email - Get an account by a particular email.
  + POST /account - Insert a new account.
  + PUT /account/:id/changeAvatar - Change the avatar of an account

## Database Schemas
  //account
  UserSchema = new mongoose.Schema({
      name: String,
      email: {type: String},
      password: String,
      introduction: {type: String, default: ''},
      avatar: {type: String, default: ''}
  },
  {collection: 'account'});

  //picture
  PictureSchema = new mongoose.Schema({
      name: String,
      contentTitle: {type: String, default: ''},
      content: {type: String, default: ''},
      date: Date,
      comment: [],
      url: String,
      userid: {type: mongoose.Schema.ObjectId, ref: 'account'},
      upvote: Number
  },
  {collection: 'pictures'});

  //board
  BoardSchema = new mongoose.Schema({
          category: String,
          name: String,
          size: Number,
          follow: Number
  },
  { collection: 'board' });

## Continuous Integration and Test results.

  https://travis-ci.org/koyomi233/QiLuo_Clint

  https://coveralls.io/repos


## Extra features.
  Based on the test in Assignment 1, I managed to add Authentication in this application.
  The front end will read the information you entered, and retrieve data from the backend
  for verification. If it is correct, the page will turn to the homepage.


