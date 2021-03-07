const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    key: {
        type: String
    },
    value: {
        type : String
    },
    createdAt: {
        type: Date
    },
    counts: [
      {
        type: Number
      }
    ]
    // counts:{type:Array,"default":[]}

},
// {
//     timestamps:true
// }
);

module.exports = mongoose.model('record', recordSchema);
