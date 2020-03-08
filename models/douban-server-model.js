import mongoose from '../mongodb/index'
const Schema = mongoose.Schema;
let DoubanPersonSchema = new Schema({
  base: { type: String, default: ''},
  name: { type: String, default: '', index: true},
  head: { type: String, default: ''},
  home: { type: String, default: ''},
  homeurl: { type: String, default: ''},
  sex: { type: String, default: ''},
  birth:{ type: String, default: ''},
  home_addr: { type: String, default: ''},
  job: { type: String, default: ''},
  doubanID: { type: String, default: ''},
});
export default mongoose.model('DoubanPerson', DoubanPersonSchema, 'doubanperson');
