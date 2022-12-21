# Mortal Kombat WikiPedia - ReactJs, NodeJs, MySQL, RestAPI


## Description:

This project was made as a way to practice my back-end RestAPI development.
In the website authenticated users can create, edit, and delete character pages, and all 
CRUD operations get saved in a JawsDB MySQL database.
<br>
<br>
<a href="https://chriscash2020.github.io/mk11-client/" target="_blank" >Live Demo</a>

## Technologies Used:

- ReactJS
- NodeJS
- ExpressJS
- MySQL

## Design:

### Client-side:

This is the front-end repository

> Preview
<p>
<img src="https://github.com/ChrisCash2020/Images/blob/master/mk11/mk11.gif" />
</p>

<br/>

> Routes
<p float="left">
<img src="https://github.com/ChrisCash2020/Images/blob/master/mk11/home.png" width="500" height="280" />
<img src="https://github.com/ChrisCash2020/Images/blob/master/mk11/logged.png" width="500" height="280" />
<img src="https://github.com/ChrisCash2020/Images/blob/master/mk11/create.png" width="500" height="280" />
<img src="https://github.com/ChrisCash2020/Images/blob/master/mk11/edit.png" width="500" height="280" />
</p>

<br/>


### Server-Side:

The back-end repository: <a href="https://github.com/ChrisCash2020/mk11-server1/" target="_blank" >MK11</a>

Express server:
  - Module-View-Controller design pattern
  - Manually contructed a User and Posts models each having controllers and routing
  - In-house SQL queries used to facillitate database requests

### Database:

Tables:
- Users: stores username and password
- Posts: stores character info such as about, appearence, name, image, real name, gender, first debut, last game entry, and birthplace 
- Trivia: stores each character trivia 



  
