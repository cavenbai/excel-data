import mongoose from '../mongodb/index'
const Schema = mongoose.Schema;
let UserSchema = new Schema({
  name:String,
  password:String,
});
export default mongoose.model('User', UserSchema, 'results_user');
