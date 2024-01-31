import * as fs from 'fs-extra';
import * as path from 'path';
import * as chalk from 'chalk';
import * as Mock from 'mockjs';
import { METHOD_LIST, NAME_SUFFIX } from './constant';

/**
 * @description 获取目标文件夹下的所有请求方式
 * @param targetDir string 目标文件
 * @return {}
 */
export const getMethods = (targetDir:string) => {
  // 读取目标路径下所有文件夹名称
  const dirs = fs.readdirSync(targetDir);
  const methods = [];
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    const dirPath = path.resolve(targetDir, dir);
    // 检索文件或目录的基本
    const isDirectory = fs.lstatSync(dirPath).isDirectory();
    const isRequestMethod = METHOD_LIST.includes(dir);
    // 过滤-以请求方式命名的文件目录
    if (isDirectory && isRequestMethod) {
      methods.push({ method: dir, dirPath });
    }
  }
  return methods;
};


/**
 * @description 文本内容匹配全局替换
 * @param text 文本
 * @param originIdentifier 原文本中的标识
 * @param replaceIdentifier 替换为
 * @return string
 */
export const replaceTextByIdentifier = (text:string, originIdentifier:string = '_', replaceIdentifier:string = '/') => {
  // api_form_submit__a.json => api/form/submit_a
  const reg1 = new RegExp(`${originIdentifier}`, 'g');
  const reg2 = new RegExp(replaceIdentifier + replaceIdentifier, 'g');
  return `/${text.replace(reg1, replaceIdentifier).replace(reg2, originIdentifier).replace(NAME_SUFFIX, '')}`;
};


/**
 * @description 获取某一个范围的数值
 * @param range {string}
 * @return number
 */
const getRandomNumber = (range:string) => {
  const [i, x] = range.split('-');
  const min = Number(i) * 1;
  const max = Number(x) * 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @description 同步等待
 * @param time {string|number}
 * @return Promise
 */
const asyncAwait = (time) => {
  const t = time === 'number' ? time : getRandomNumber(time);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, t);
  });
};


/**
 * @description 注册接口
 * @param app {Object} app
 * @param config {Object} 配置参数
 * @return void
 */
export const registerInterface = (app, { url = '', method = '', timeout = '', jsonFilePath = '' } = {}) => {
  console.log(`mock request: ${chalk.bgBlue(method)} => ${chalk.cyan(url)}`);
  app[method](url, async (req, res) => {
    if (timeout) {
      await asyncAwait(timeout);
    }
    // 读取 json 文件
    const json = fs.readJsonSync(jsonFilePath);
    res.send(Mock.mock(json));
  });
};
