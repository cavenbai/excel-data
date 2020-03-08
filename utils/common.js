export default class Common {
    // 数组根据日期和编码重组方法
    static combinationArr (arr) {
        let indexArr = [], map = {}
        for(let i = 0; i < arr.length; i++){
            let firstArr = arr[i];
            if(!map[firstArr.data + firstArr.number]){
                indexArr.push({id: firstArr.data + firstArr.number, data: [firstArr]});
                map[firstArr.data + firstArr.number] = firstArr.data + firstArr.number
            }else{
                for(let j = 0; j < indexArr.length; j++){
                    if(indexArr[j].id === firstArr.data + firstArr.number){
                        indexArr[j].data.push(firstArr);
                        break;
                    }
                }
            }
        }
        return indexArr
    }

    // 判断一个数值是否在一个范围内
    static numericalJudgement(baseNumber,currentNumber,rate) {
        if (Number(currentNumber*rate.toFixed(2)) >= baseNumber - 0.5 && Number(currentNumber*rate.toFixed(2)) <= baseNumber + 0.5) {
            return true
        } else {
            return false
        }
    }

    // 从数组中取出任意个数，求和为指定值的解
    static calSum(array1,result,rate) {
        let array = array1.filter( x => x.lender !== 0)
        for (let i = 1; i < 1 << array.length; i++){  //从1循环到2^N
            let sum = 0;
            let temp = [];
            for (let j = 0; j <array.length; j++) {
                //用i与2^j进行位与运算，若结果不为0,则表示第j位不为0,从数组中取出第j个数
                if ((i & 1 << j) !== 0) {
                    sum += Number(array[j].lender * rate.toFixed(2));
                    temp.push(array[j]);
                }
            }
            if(sum >= result - 0.04 && sum <= result + 0.04){
                console.log(sum,111)
                console.log(temp,111)
                return temp
            }
        }
    }
    //检测类型是否为数组
    static isArray(param) {
        return Object.prototype.toString.call(param).slice(8, -1) === 'Array';
    }

    // 检测类型是否为对象
    static isObject(param) {
        return Object.prototype.toString.call(param).slice(8, -1) === 'Object';
    }

    // 检测类型是否为字符串
    static isString(param) {
        return Object.prototype.toString.call(param).slice(8, -1) === 'String';
    }

    // 检测类型是否为函数
    static isFunction(param) {
        return Object.prototype.toString.call(param).slice(8, -1) === 'Function';
    }

    // 检测类型是否为时间类型
    static isDate(param) {
        return Object.prototype.toString.call(param).slice(8, -1) === 'Date';
    }

    // 检测类型是否为数字
    static isNumber(param) {
        return Object.prototype.toString.call(param).slice(8, -1) === 'Number' && !Number.isNaN(param);
    }
}
