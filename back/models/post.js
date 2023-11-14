
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema(
  {
    filehash: {
      type: String,
      required: true
    },
    fileContent: {
      type: String,
      required: true
    },
   /// cid : {
    //  type: String,
    //  required: true
    //}

  },
  { timestamps: true,
    bufferCommands: false,
    autoCreate: false
   },
  
);

module.exports = mongoose.model('fichier_et_metadata', postSchema);
