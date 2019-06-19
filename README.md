[![Build Status](https://travis-ci.org/kodek-sleuth/Contacts-book.svg?branch=develope)](https://travis-ci.org/kodek-sleuth/Contacts-book)
[![Coverage Status](https://coveralls.io/repos/github/kodek-sleuth/Contacts-book/badge.svg?branch=develope)](https://coveralls.io/github/kodek-sleuth/Contacts-book?branch=develope)


# Contact-book
Contacts-book is a simple mvp built for saving user contacts

## Built With

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework


## Supporting Packages
#### Linter

* [ESLint](https://eslint.org/) - Linting Tool

## Installation/Getting Started
* Git clone repository
``` 
git clone <repo_url>
```

* Install all dependencies
```
npm install
```
## Running
```
npm start
```

## Testing

### Testing with [Postman](www.postman.com)
```
* Install and setup Postman 
* Navigate to localhost 3000 
```

### Testing with Mocha and Chai
```
npm test in terminal
```
## Features
* User can save a contact.
* User can update a contact.
* User can delete a contact.
* User can view all contacts.

## Endpoints
|  Method  |  Endpoint  |  Task  |
|  --- |  --- |  ---  |
|  `POST`  |  `/contacts`  |  `User save contact`  |
|  `GET`  |  `/contacts`  |  `User view contacts`  |
|  `PATCH`  |  `/contacts/:id`  |  `Update User contacts`  |
|  `DELETE`  |  `/contacts/:id`  |  `Delete User contacts`  |

#### Credit
* All credit given to [Brian](https://andela.com) for requiring us to present a simple project



