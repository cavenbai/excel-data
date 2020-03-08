// import Person from '../models/person-server-model'
// import YoungPerson from '../models/young-server-model'
// import Photo from '../models/photo-server-model'
// import WikiPerson from  '../models/wiki-server-model'
// import IMDBPerson from  '../models/imdb-server-model'
// import DoubanPerson from '../models/douban-server-model'
// import User from '../models/user-server-model'
// import Log from '../models/log-server-model'
// import ApiErrorNames from '../utils/error'
import common from '../utils/common'
// import jwt from  'jsonwebtoken'
// import mongoose from 'mongoose'
import formidable from 'formidable'
import xlsx from 'node-xlsx'


class apiController {
  /**
   * @type {{personTotal: module.exports.personTotal}}
   * @description 查询总览信息
   */
  static async personTotal (ctx) {
    try {
        let rateNumber,sheetNumber  // 接收税率及sheet页数
        if (ctx.params.id) { rateNumber = Number(ctx.params.id) }
        if (ctx.params.sheet) { sheetNumber = Number(ctx.params.sheet) - 1 }
        // 通过formiadble将获取前端通过http请求上传的excel文件，
        // 并将文件保存至本地（因为node-xlsx无法通过虚拟地址解析文件）。
        // 然后通过node-xlsx解析并获取excel文件中的数据。将数据获取完后，删除本地excel文件
        let config = ['data','number','name','abstract','subject_name','subject_number','debtor','lender']
        let secondArr = [] // 返回满足条件的项
        let baseSecondArr = [] // 基准值所有的项
        let p = new Promise((resolve,reject) => {
            let form = new formidable.IncomingForm()
            form.maxFileSize = 100 * 1024 * 1024; // 文件最大值
            form.keepExtensions = true; // 路径是否显示文件扩展名
            form.parse(ctx.req,(error,fields,files) => {
                let tempPath = files.file.path; // 获取文件的虚拟地址
                let workebook = xlsx.parse(tempPath)
                let totalData = workebook[sheetNumber].data  // 获取某一页数据
                totalData.splice(0,2)
                let recombinationArr = [] // 初始化对象数组
                for (let i = 0;i < totalData.length;i++) {
                    if (totalData[i].length > 0 && totalData[i][0] !== undefined) {
                        let obj = {}
                        for (let j = 0;j < totalData[i].length;j++) {
                            obj[config[j]] = typeof totalData[i][j] === 'string' ? totalData[i][j].replace('\t','') : totalData[i][j]
                        }
                        recombinationArr.push(obj)
                    }
                }
                // 得到重组之后数组
                let newArr = common.combinationArr(recombinationArr)
                for (let i = 0; i < newArr.length; i++) {
                    // 判断分组中的全部是否都不满足要求，都不满足去掉该组,不做比较
                    if (newArr[i].data.every(x => x.subject_name.indexOf('应交税费') !== -1)) { continue;}
                    // 在满足条件的分组中，先挑出基准项，剩余其他项的贷方金额 * 税率与基准项的贷方金额比较
                    // 第一：满足当前分组中不能同时出现两个以上税率【10% 20%等】过滤多余基准项
                    let currentBaseNumber = newArr[i].data.filter(x => x.subject_name.search('应交税费')!== -1 && x.subject_name.search('销项税额')!== -1 && x.subject_name.search(`${rateNumber*100}％`)!== -1 )[0].lender; // 定义基准值的贷方金额
                    baseSecondArr.push(currentBaseNumber)
                    let baseArr = newArr[i].data.filter(x => x.subject_name.search('应交税费')=== -1); // 找到所有不是基准值的项
                    // 如果当前组中有一个贷方金额 * 税率与基准项相同则跳出当前循环
                    if (baseArr.some( x => common.numericalJudgement(currentBaseNumber,x.lender,rateNumber))) {
                        for (let value of baseArr) {
                            if (common.numericalJudgement(currentBaseNumber,value.lender,rateNumber)) {secondArr.push(value)}
                        }
                    } else {
                        let rateArr = [] // 每项求出rate的集合
                        // 如果当前分组中每一项都不等于基准项的值，那么把当前所有项的值都加起来与基准项比较，若相同则跳出当前循环
                        baseArr.forEach((value,index) => {rateArr.push(Number(value. lender*rateNumber.toFixed(2)))})
                        let add = rateArr.reduce((x,y)=>x+y)
                        if (add >= currentBaseNumber -0.5 && add <= currentBaseNumber + 0.5) {
                            secondArr.push(...baseArr);
                        } else {
                            secondArr.push(...common.calSum(baseArr,currentBaseNumber,rateNumber))
                        }
                    }
                }
                // console.log(baseSecondArr,'所有基准值的贷方金额')
                // console.log(secondArr,'满足所有要求的基本项')
                let obj = {baseTotal:baseSecondArr.reduce((x,y) => x+y),data:secondArr,secondTotal:secondArr.reduce((p,e) =>p+Number(e.lender*rateNumber),0)}
                resolve(obj)
            })
        })
        ctx.body = {status: true, data: await p}
    }catch (e) {}
  }
}

module.exports =  apiController
