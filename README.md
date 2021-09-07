# A Simple Shopping Cart
A small simple shopping cart application built with the express framework. It focuses mainly 
on the functionalities surrounding managing a cart for a user. 

# Task 
Build a small shopping cart application. Assume that there is a list of products in a category
(eg. food or clothing) which contain a set of standard attributes (sku, selling price, stock level, expiration date etc.) 
which a user can add to, remove from and edit inside a cart.

# Technologies 
- **Language** - Typescript
- **Framework** - Express
- **ORM** - TypeORM
- **Database** - MYSQL
- **Test kit** - Mocha, Chai

## Getting Started

These instructions will get you a copy of the project up
and running on your local machine for development and
testing purposes.

1. Pull/download code from [repository](https://github.com/Nanahawau/Shopping-Cart)
   
2. Run the command 
```shellscript
   $ npm install
```
3. Copy .env.example file to .env, and fill in the necessary information.
4. Create a database with a name of your choice on your local mysql instance, 
   set the name in your env file.
5. Run project using this command, this also initialise tables
```shellscript
   $ npm instal
```
6. Run database seeder using this command
```shellscript
   $ npm run migrate:up
```

7. Go over Postman Docs for more information about endpoints [postmandocs](https://documenter.getpostman.com/view/9516731/U16gPSPw)



## Authors
* **Nana Hawau Adeku** - [@Nana-Hawau](https://github.com/Nana-Hawau)





