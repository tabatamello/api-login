const mongoose = require('mongoose')

// mongoose.createConnection('mongodb://localhost:27017/skyapi', { useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/skyapi', { useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;