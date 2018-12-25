var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'user',
    password: '11111',
    database: 'Test2'
});

exports.query= (Sql,options,callback)=> {
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        } else {
            conn.query(Sql,options,function(err,results,fields){
                conn.release();
                callback(err,results,fields);
            })
        }

    });
};

