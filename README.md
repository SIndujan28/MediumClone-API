# MediumClone-API
A Nodejs powered REST API for Content-Management-System alike Medium.This API provides the ability for the people to follow any author and create a post. People can like the post and get notification when a user they follow create a new one.

## Features
1. Authentication local + jwt
2. User can create a post
3. User can delete is own post and update it
4. User can follow an other one
5. User get notification on following new post
6. User can like a post
7. User can see all the post they like

## Modules used
1. Nodejs
2. express
3. passportjs
4. MongoDB to persist post details.

## Getting started

 ### Prerequisites
1. Install Nodejs using this [guide](https://nodejs.org/en/download/).
2. Install [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)
3. Install [MongoDB](https://docs.mongodb.com/manual/installation/) and run the instance in available port.
 ### Steps to reproduce locally
  1. Clone this repository
```bash
     git clone git@github.com:SIndujan28/MediumClone-API.git
```
  2. Run the following command to install all the neccessary modules.
```
     npm install
```
  or
```
    yarn install
```
  3. Update the config file under src directory with mongoDB instance address.
  4. Finally run this command to start the server.
```bash
    npm run dev:build && npm run dev
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
