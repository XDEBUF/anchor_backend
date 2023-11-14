
import pkg from 'mongoose';
const {  Schema, model } = pkg;

const postSchema = new Schema(
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

export default model('fichier_et_metadata', postSchema);
