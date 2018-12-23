let express = require('express')

let app = express ();

var port = process.env.PORT || 8080;

let apiRoutes=require('./api-routes');

app.use('/api',apiRoutes);

app.listen(port,function(){
    console.log("Running Test Server on port"+port);
});