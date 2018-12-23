const db = require('./SQLPool')

exports.test = (req, res) => {
  return res.json({
    status: 'testing',
    message: 'testing'
  })
}

const queryString = 'select* from books'

exports.getAll = (req, res) => {
  db.query(queryString, (err, results, fields) => {
    if (err != null) {
      return res.json({ status: 'db error' })
    }
    return res.json({ result: results, field: fields })
  })
}
