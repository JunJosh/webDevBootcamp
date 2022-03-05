const express = require("express");
const app = express();
const path = require('path');
const redditData = require('./datadummy.json');
console.log(redditData)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Snow', 'Alpari', 'Flackyri'
    ]
    res.render('cats', { allCat : cats})
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    // console.log(data);
    if(data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit })
    }
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random()*10) + 1;
    res.render('random', { rand: num})
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})