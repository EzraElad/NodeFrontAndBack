const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

// MongoDB - Connection string
const dbURI = "mongodb+srv://elad:0509014778@cluster0.fhnpx.mongodb.net/node-tuts"
mongoose.connect(dbURI , { useNewUrlParser: true , useUnifiedTopology: true })
    .then((result) => console.log('Connected to DB'))
    .catch((err) => {
        console.log(err);
        console.log('ERROR');
    })


//Register view engine
app.set('view engine' , 'ejs');

// Middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'));


app.use((req , res, next) => {
    // Can do next either way
    // req.next();
    next();
})

// Paths
app.get('/' , (req , res) => {
    const blogs = [
        {title: 'yoshi find eggs', snippet: 'Lorem ipsum dal orem alek mashany'},
        {title: 'Mario find the star', snippet: 'Lorem ipsum dal orem alek mashany'},
        {title: 'How to defeat Bowser', snippet: 'Lorem ipsum dal orem alek mashany'}
    ]
    res.render('index', {title : 'Home', blogs})
})

app.get('/about' , (req , res) => {
    res.render('about' , {title : 'About'})
})

app.get('/blogs/create' , (req , res) => {
    res.render('create' , {title : 'Create Blog'})
})

// Redirects
app.get('/about-us' , (req ,res)=>{
    res.render('404' , {title : '404'})
})

// 404 Page
// How node knows how to send the 404 page ?
// First express will go throgh all the paths to find a match 
// when it find a match express stops to look 
// But if there isnt any match that code will be excuted
app.use((req, res) => {
    res.status(404).render('404')
})

// Server starting
const PORT = 3000
app.listen(PORT , () => {
    console.log(`Server is up and running on port ${PORT}`);
})