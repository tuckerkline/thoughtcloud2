var mongoose = require('mongoose')

var thoughtSchema = mongoose.Schema( {
	thought   : { type : String, required: true },
	comments  : { type : Array, default: []},
	uptick    : { type : Number, default: 0}  

})



module.exports = mongoose.model('thought', thoughtSchema)