const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 8080

const apiRoutes = require('./api-routes')

app.use(bodyParser.json())

app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Running Test Server on port${port}`)
})
