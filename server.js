const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
dbConnectionStr = process.env.DB_STRING,
dbName = 'orc'
//Connecting to MongoDB
MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client =>{
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
//Setting view engine/templater to EJS.
app.set('view engine','ejs')
//telling the app to give access to public folder
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/',(req,res)=>{
    //finding the collection and putting it in an array
    db.collection('subjects').find().toArray()
    .then(data => {
        res.render('index.ejs',{info: data})
    })
    .catch(error => console.error(error))
})
//adding one subject to the DB when the form is submitted.
app.post('/addSubject',(req,res)=>{
    db.collection('subjects').insertOne({firstName: req.body.firstName,lastName: req.body.lastName,age: req.body.age,description: req.body.description,likes: 0})
    .then(result =>{
        console.log('Subject Added')
        //refreshes page after the POST
        res.redirect('/')
    })
    .catch(error=>console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('subjects').updateOne({firstName: request.body.firstNameS, lastName: request.body.lastNameS,likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: 1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteSubject', (request, response) => {
    db.collection('subjects').deleteOne({firstName: request.body.firstNameS})
    .then(result => {
        console.log('Subject Deleted')
        response.json('Subject Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
