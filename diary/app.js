const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./logger')

const diaryRouter = require('./routers/diary.js')

app.use(logger)
app.use(cors())
app.use(express.json())
app.use('/diary', diaryRouter)

module.exports = app