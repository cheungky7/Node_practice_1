const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('./SQLPool')
const logger = require('./logger')
const config = require('./config')

exports.test = (req, res) => {
  return res.json({
    status: 'testing',
    message: 'testing'
  })
}

exports.verifyJWT = (req, res, next) => {
  // console.log('LOGGED');
  const token = req.body.token
  jwt.verify(token, config.secret, (err, decoded) => {
    // console.log(err)
    // console.log(decoded) 
    if (err != null) {
      // return res.json({ status: 'error', error: err })
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    }

    req.id = decoded.id;
  })

  next()
}

exports.getAll = (req, res) => {

/*
  const token = req.body.token

  jwt.verify(token, config.secret, (err, decoded) => {
    console.log(err)
    console.log(decoded) 
  })
*/
  const queryStringAll = 'select* from books'
  db.query(queryStringAll, (err, results, fields) => {
    if (err != null) {
      return res.json({ status: 'db error' })
    }
    return res.json({ result: results, field: fields })
  })
}
/*
INSERT INTO `Test2`.`books`
(`idbooks`,
`name`,
`ISBN`,
`aurthor`,
`publish date`)
VALUES
(2,
'Test2',
'12345635',
'test_writer',idbooks
20181012);
*/

exports.insertABook = (req, res) => {
  // console.log(req)
  // console.log(queryStringInsertABook);
  const queryStringInsertABook = 'INSERT INTO `Test2`.`books`(`name`,`ISBN`,`aurthor`,`publish date`)VALUES(?,?,?,?)'
  const InsertValues = [req.body.name,
    req.body.ISBN, req.body.aurthor, req.body.publishdate]

  logger.log({
    level: 'info',
    message: `${queryStringInsertABook}`
  });

  db.query(queryStringInsertABook, InsertValues, (err, results, fields) => {
    if (err != null) {
      return res.json({ status: 'db error', error: JSON.stringify(err) })
    }
    return res.json({ result: results, field: fields })
  })
}

exports.userRegister = (req, res) => {
  const queryString = 'INSERT INTO `Test2`.`users`(`email`,`username`,`password`)VALUES(?,?,?)'
  const salt = bcrypt.genSaltSync(10)
  const encryptedPassword = bcrypt.hashSync(req.body.password, salt)
  const InsertValues = [req.body.email, req.body.username, encryptedPassword]
  db.query(queryString, InsertValues, (err, results, fields) => {
    if (err != null) {
      return res.json({ status: 'db error', error: JSON.stringify(err) })
    }
    return res.json({ result: results, field: fields })
  })
}

exports.userLogin = (req, res) => {

  const queryString = 'SELECT password from Test2.users where username=?'
  const InsertValues = [req.body.username ]
  db.query(queryString, InsertValues, (err, results, fields) => {
    if(err != null) {
      return res.json({ status: 'db error', error: JSON.stringify(err) })
    }
    console.log(results)
    // console.log(req.body.password)
    const passwordInput = req.body.password
    const password = results[0].password

    if (bcrypt.compareSync(passwordInput, password)) {
      const gentoken = jwt.sign({ id: req.body.username }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      })

      return res.json({ token: gentoken })
    }
    return res.json({ status: 'password not correct' })
  })
}
