"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const constant_1 = require("./constant");
const utils_1 = require("./utils");
const start = (app, config) => {
    const { folderName = 'mock', timeout } = config || {};
    // 检测根目录下是 mock 目录是否存在
    const targetDir = path.resolve(process.cwd(), folderName);
    const isExists = fs.existsSync(targetDir);
    if (!isExists) {
        console.log(chalk.red(`mock error: 请保证跟路径下存在 ${folderName} 文件夹`));
        return;
    }
    const methods = (0, utils_1.getMethods)(targetDir);
    if (!methods.length)
        return;
    console.log(chalk.green('-----------------本地 mock 启动！-----------------'));
    methods.forEach((item) => {
        const { method, dirPath } = item;
        const fileNames = fs.readdirSync(dirPath);
        fileNames.forEach((name) => {
            if (path.extname(name) === constant_1.NAME_SUFFIX) {
                const url = (0, utils_1.replaceTextByIdentifier)(name, '_', '/');
                (0, utils_1.registerInterface)(app, { url, method, timeout, jsonFilePath: `${dirPath}/${name}` });
            }
        });
    });
    console.log(chalk.green('--------------------------------------------------'));
};
exports.start = start;
