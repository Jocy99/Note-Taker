const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const app = express();
const PORT = 3001;
const fs = require('fs');
// middlewares
// allows us to use json format language
app.use(express.json());
// allows us to use static files ex;html and css files
app.use(express.static('public'));
 
// front end routes
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'))
});
app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname,'./public/notes.html'))
});

// API server routes
app.get('/api/notes', (req, res) =>{
    res.json(db)
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = db.length + 1;
    // console.log(newNote);
    db.push(newNote);
    console.log(db);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db)
});
// allows app to llisten on a specific port
app.listen(PORT, ()=>{
    console.log('listening to port 3001');
});