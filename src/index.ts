import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { NAME_SUFFIX } from './constant';
import { getMethods, replaceTextByIdentifier, registerInterface } from './utils';


const start = (app, config) => {
  const { folderName = 'mock', timeout } = config || {};
  // 检测根目录下是 mock 目录是否存在
  const targetDir = path.resolve(process.cwd(), folderName);
  const isExists = fs.existsSync(targetDir);
  if (!isExists) {
    console.log(chalk.red(`mock error: 请保证跟路径下存在 ${folderName} 文件夹`));
    return;
  }

  const methods = getMethods(targetDir);
  if (!methods.length) return;
  console.log(chalk.green('-----------------本地 mock 启动！-----------------'));
  methods.forEach((item) => {
    const { method, dirPath } = item;
    const fileNames = fs.readdirSync(dirPath);
    fileNames.forEach((name) => {
      if (path.extname(name) === NAME_SUFFIX) {
        const url = replaceTextByIdentifier(name, '_', '/');
        registerInterface(app, { url, method, timeout, jsonFilePath: `${dirPath}/${name}` });
      }
    });
  });
  console.log(chalk.green('--------------------------------------------------'));
};

export default {
  start
};
