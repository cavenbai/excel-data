import mongoose from '../mongodb/index'
const Schema = mongoose.Schema;
let IMDBPersonSchema = new Schema({
  name: {type: String, default: '', index: true},
  desc: { type: String, default: ''},
  homeurl: { type: String, default: ''},
  rank: { type: String, default: ''},
  head: { type: String, default: ''},
  tag: { type: String, default: ''},
  IMDBID: { type: String, default: ''},
});
export default mongoose.model('IMDBPerson', IMDBPersonSchema, 'IMDBperson');
