# Secure login system
**Login system without any tokens or session IDs** <br>
__It's example code of my idea, I don't recommend using it as website, better copy some parts from code__

## Setup
Make sure you have NodeJS installed.
First install required modules:
```
npm i express
npm i dotenv
npm i body-parser
```
Then just run
```
node index.js
```

## How does it work?
When you login your login is being assigned to your IP adress. Website checks for login in your IP and returns login or home page.

## But why it's more secure?
Most of websites use cookies to save tokens, it's easy to steal your account by just copying token from cookies.
This website doesn't use any cookies.