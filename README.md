# Assignment 2 - Web API - Automated development process.

Name: Zhiwen Han

## Overview.

 Based on Assignment 1, there are some changes in Assignment 2: delete collection model, add
 some new attributes to account and picture, and delete some useless methods.
 Two models: picture and user. The relation among these two is that user creates pictures,

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

## Continuous Integration and Test results.

https://travis-ci.org/koyomi233/QiLuo_Clint

https://coveralls.io/repos


## Extra features.
  Based on the test in Assignment 1, I managed to add Authentication in this application.
  The front end will read the information you entered, and retrieve data from the backend
  for verification. If it is correct, the page will turn to the homepage.


