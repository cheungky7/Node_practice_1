const db = require('./SQLPool')

exports.test = (req, res) => {
  return res.json({
    status: 'testing',
    message: 'testing'
  })
}

const queryStringAll = 'select* from books'

exports.getAll = (req, res) => {
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

const queryStringInsertABook = 'INSERT INTO `Test2`.`books`(`name`,`ISBN`,`aurthor`,`publish date`)VALUES(?,?,?,?)'

exports.insertABook = (req, res) => {
 // console.log(req)
 // console.log(queryStringInsertABook);
  const InsertValues = [req.body.name,
    req.body.ISBN, req.body.aurthor, req.body.publishdate]
  db.query(queryStringInsertABook, InsertValues, (err, results, fields) => {
    if (err != null) {
      return res.json({ status: 'db error', error: JSON.stringify(err) })
    }
    return res.json({ result: results, field: fields })
  })
}
