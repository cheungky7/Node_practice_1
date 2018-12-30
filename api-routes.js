
const router = require('express').Router()
const controller = require('./api-controller')


//router.use(bodyParser.json())


router.get('/', (req, res) => {
  return res.json({
    status: 'API Its Working',
    message: 'Welcome to testing'
  })
})

router.get('/test', controller.test)

router.post('/all', controller.verifyJWT, controller.getAll)

router.post('/insert', controller.insertABook)

router.post('/register', controller.userRegister)

router.post('/login', controller.userLogin)

module.exports = router
