const db = require('./SQLPool')
const logger = require('./logger')
const bcrypt = require('bcryptjs')

exports.test = (req, res) => {
  return res.json({
    status: 'testing',
    message: 'testing'
  })
}



exports.getAll = (req, res) => {
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
/*
exports.userLogin = (req, res) => {

}
*/
