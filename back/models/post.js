
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
    stored : {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default model('fichier_et_metadata', postSchema);
