const router = require('express').Router()
const controller = require('./api-controller')

router.get('/', (req, res) => {
  return res.json({
    status: 'API Its Working',
    message: 'Welcome to testing'
  })
})

router.get('/test', controller.test);

router.get('/all', controller.getAll);

module.exports = router
