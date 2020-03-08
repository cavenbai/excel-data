import mongoose from '../mongodb/index'
const Schema = mongoose.Schema;
let PhotoSchema = new Schema({
  my_id : {
    type: String,
    index: true
  },                                      //用户ID
  base: String,                           //是否是base
  clean: Number,                           //是否清洗 0-未清洗/1-清洗通过/2-清洗未通过
  label: Number,                           //0-未标注, 1-标注可用, 2-标注不可用
  upload_time : String,                    //图片上传时间
  origin_url : String,                     //图片原始地址
  path : String,                           //图片oss中路径
  clean_meta: {origin: String},            //图片地址
  isdelete:Number,                          // 是否删除 1 删除 2 正常
  rect:Array
});
PhotoSchema.index({'my_id': 1, 'base': 1});
export default mongoose.model('Photo', PhotoSchema, 'results_photo');
