import mongoose from '../mongodb/index'
const Schema = mongoose.Schema;
let LogSchema = new Schema({
  my_id : String,
  user_name : String,
  user_id : String,
  modification_time : Date,
  old_data : Schema.Types.Mixed,
  new_data : Schema.Types.Mixed
});
export default mongoose.model('Log', LogSchema, 'results_logs');
