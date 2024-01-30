"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerInterface = exports.replaceTextByIdentifier = exports.getMethods = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const chalk_1 = require("chalk");
const mockjs_1 = require("mockjs");
const constant_1 = require("./constant");
/**
 * @description 获取目标文件夹下的所有请求方式
 * @param targetDir string 目标文件
 * @return {}
 */
const getMethods = (targetDir) => {
    // 读取目标路径下所有文件夹名称
    const dirs = fs_extra_1.default.readdirSync(targetDir);
    const methods = [];
    for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i];
        const dirPath = path_1.default.resolve(targetDir, dir);
        // 检索文件或目录的基本
        const isDirectory = fs_extra_1.default.lstatSync(dirPath).isDirectory();
        const isRequestMethod = constant_1.METHOD_LIST.includes(dir);
        // 过滤-以请求方式命名的文件目录
        if (isDirectory && isRequestMethod) {
            methods.push({ method: dir, dirPath });
        }
    }
    return methods;
};
exports.getMethods = getMethods;
/**
 * @description 文本内容匹配全局替换
 * @param text 文本
 * @param originIdentifier 原文本中的标识
 * @param replaceIdentifier 替换为
 * @return string
 */
const replaceTextByIdentifier = (text, originIdentifier = '_', replaceIdentifier = '/') => {
    // api_form_submit__a.json => api/form/submit_a
    const reg1 = new RegExp(`${originIdentifier}`, 'g');
    const reg2 = new RegExp(replaceIdentifier + replaceIdentifier, 'g');
    return `/${text.replace(reg1, replaceIdentifier).replace(reg2, originIdentifier).replace(constant_1.NAME_SUFFIX, '')}`;
};
exports.replaceTextByIdentifier = replaceTextByIdentifier;
/**
 * @description 获取某一个范围的数值
 * @param range {string}
 * @return number
 */
const getRandomNumber = (range) => {
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
const registerInterface = (app, { url = '', method = '', timeout = '', jsonFilePath = '' } = {}) => {
    console.log(`mock request: ${chalk_1.default.bgBlue(method)} => ${chalk_1.default.cyan(url)}`);
    app[method](url, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (timeout) {
            yield asyncAwait(timeout);
        }
        // 读取 json 文件
        const json = fs_extra_1.default.readJsonSync(jsonFilePath);
        res.send(mockjs_1.default.mock(json));
    }));
};
exports.registerInterface = registerInterface;
