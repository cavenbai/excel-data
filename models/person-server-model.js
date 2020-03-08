import mongoose from '../mongodb/index'
const Schema = mongoose.Schema;
let personObj = {
  my_id: {type: String, index: true}, // 人员唯一ID
  name: {type: String, index: true},  // 姓名
  ori_name: String,                       // 名人的原名称
  en_name: String,                        // 英文名称
  country: String,                        // 国籍
  birth: String,                          // 出生日期
  home_addr: {address: String, country: String, province: String, city: String}, // 家乡地址
  gender: String,                         // 性别
  age: Number,                            // 年龄
  blood_type: String,                     // 血型
  races: String,                         // 人种
  race: String,                           // 民族
  constellation: String,                  // 星座
  height: Number,                         // 身高
  weight: String,                         // 体重 KG
  spouse: String,                         // 配偶
  job: String,                            // 职业
  children: String,                       // 孩子
  site: String,	                          // 数据来源站点
  home_url: {}, // 名人基本信息来源
  nick_name: String,                      // 别名
  marriage: String,                       // 婚姻状况
  company: String,                        // 公司
  province: String,                       // 省份
  schools: {
    school: String,                       // 学校
    grade: String,                        // 年级
    major: String                         // 主修课程
  },
  query: Boolean,                         // 是否需要收集 暂时不用
  create_time: Date,                    // 创建时间
  industry: Array,                        // 行业
  person_label: Number,                   // 是否标注 0 未标注，1 标注可用，2 标注不可用 3 标注中
  base_num: Number,                       // base图数量
  query_num: Number,                      // 查询图数
  clean: Number,                          // 0-未清洗/1-清洗通过/2-清洗未通过
  query_age: String,                        // 查询分布的年龄段
  is_small:Number                         // 是否为小号（0：不是 1：是）
};
let PersonSchema = new Schema(personObj);
PersonSchema.index({'name': 1, 'ori_name': 1, 'query_num': 1});
export default mongoose.model('Person', PersonSchema, 'results_label');
