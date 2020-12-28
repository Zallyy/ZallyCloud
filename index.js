const express = require('express')
const upload = require('express-fileupload')
const fetch = require('node-fetch')

const fs = require('fs')

const config = require('./config')

const app = express()

app.use(express.static('public'))
app.use(upload())

const uploadsFolder = './public/uploads'

const updateData = async () => {
    const files = fs.readdirSync(uploadsFolder)
    const newData = []
    files.forEach((file) => {
        newData.push({
            fileName: file,
        })
    })
    await fetch(config.db, {
        method: 'put',
        body: JSON.stringify(newData),
        headers: {
            'Content-Type': 'application/json',
            'secret-key': config.apiKey,
            versioning: false,
        },
    })
}

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res, next) => {
    let file = req.files.file
    let fileName = file.name
    file.mv(`${uploadsFolder}/${fileName}`, (error) => {
        if (error) {
            res.send(error)
        } else {
            res.redirect(`./index.html`) //Prevent's form resubmit
            updateData()
        }
    })
})

app.listen(3000)
console.log(`http://localhost:3000`)
