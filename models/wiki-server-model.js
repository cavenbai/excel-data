import mongoose from '../mongodb/index'
const Schema = mongoose.Schema;
let wikiObj = {
  cn_name: {
    type: String,                         // 姓名
    index: true
  },
  ori_name: String,                       // 名人的原名称
  en_name: String,                        // 英文名称
  descriptions: String,
  url: String,                            // wiki的地址
  country: String,                        // 国籍
  birth: String,                          // 出生日期
  gender: String,                         // 性别
  industry: String,                       // 行业
  home_addr: String,                      // 家乡地址
  source: String,                         // 来源
  base_num: Number,                       // base图数量
  img_url: String,                        // base图片地址
  imdb_id: String,
  douban_id: String
};
let WikiPersonSchema = new Schema(wikiObj);
export default mongoose.model('WikiPerson', WikiPersonSchema, 'wikiperson');
