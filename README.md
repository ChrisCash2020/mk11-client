# Mortal Kombat Wikipedia - ReactJs, NodeJs, MySQL, RestAPI


## Description:

- Architected and launched a Wikipedia platform, leveraging the MVC design pattern, to facilitate character page creation, editing, and deletion for authenticated users.
- Express and MySQL as the back end and React as the front-end.
- Strengthened user authentication and server communication by facilitating the exchange of HTTP only session cookies, enhancing security protocols and preserving the
confidentiality of user data

<br>
<br>
<a href="https://mkwiki11.netlify.app/" target="_blank" >Live Demo</a>
> Preview
<p>
<img src="https://github.com/ChrisCash2020/Images/blob/master/mk11/mk11.gif" />
</p>

## Technologies Used:

- ReactJS
- NodeJS
- ExpressJS
- MySQL

## Top Features:
- Bcrypt password encryption/verification
- Multer file upload of character images
- Session cookies authentication and authorization
- Bcrypt password encryption/verification

## Design:

### Client-side:

This is the front-end repository

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
  - Module-View-Controller project structure
  - Manually contructed User and Posts models (NO-ORM)
  - Store User profile images in static folder on server
  - User Authenication done through secure HTTP only Session cookies

### Database:

Tables:
- Users: stores username and password
- Posts: stores character info such as about, appearence, name, image, real name, gender, first debut, last game entry, and birthplace 
- Trivia: stores each character trivia 



  
