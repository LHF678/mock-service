"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const chalk_1 = require("chalk");
const constant_1 = require("./constant");
const utils_1 = require("./utils");
const start = (app, config) => {
    const { folderName = 'mock', timeout } = config || {};
    // 检测根目录下是 mock 目录是否存在
    const targetDir = path_1.default.resolve(process.cwd(), folderName);
    const isExists = fs_extra_1.default.existsSync(targetDir);
    if (!isExists) {
        console.log(chalk_1.default.red(`mock error: 请保证跟路径下存在 ${folderName} 文件夹`));
        return;
    }
    const methods = (0, utils_1.getMethods)(targetDir);
    if (!methods.length)
        return;
    console.log(chalk_1.default.green('-----------------本地 mock 启动！-----------------'));
    methods.forEach((item) => {
        const { method, dirPath } = item;
        const fileNames = fs_extra_1.default.readdirSync(dirPath);
        fileNames.forEach((name) => {
            if (path_1.default.extname(name) === constant_1.NAME_SUFFIX) {
                const url = (0, utils_1.replaceTextByIdentifier)(name, '_', '/');
                (0, utils_1.registerInterface)(app, { url, method, timeout, jsonFilePath: `${dirPath}/${name}` });
            }
        });
    });
    console.log(chalk_1.default.green('--------------------------------------------------'));
};
exports.default = {
    start
};
