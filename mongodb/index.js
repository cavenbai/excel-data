import mongoose from 'mongoose'
import { DB_URL } from '../config/db'
mongoose.set('useCreateIndex', true);
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () =>{})
    .then(()=>console.log('数据库连接成功'))
    .catch(()=>console.log('数据库连接失败'));
mongoose.connection.on('error', console.error.bind(console, 'MongoDB 连接错误：')); // 连接异常 error 数据库连接错误）
mongoose.connection.on('disconnected', console.error.bind(console, 'MongoDB 连接异常断开：')); // 连接断开 disconnected 连接异常断开

export default mongoose
