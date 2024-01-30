/**
 * @description 获取目标文件夹下的所有请求方式
 * @param targetDir string 目标文件
 * @return {}
 */
export declare const getMethods: (targetDir: string) => any[];
/**
 * @description 文本内容匹配全局替换
 * @param text 文本
 * @param originIdentifier 原文本中的标识
 * @param replaceIdentifier 替换为
 * @return string
 */
export declare const replaceTextByIdentifier: (text: string, originIdentifier?: string, replaceIdentifier?: string) => string;
/**
 * @description 注册接口
 * @param app {Object} app
 * @param config {Object} 配置参数
 * @return void
 */
export declare const registerInterface: (app: any, { url, method, timeout, jsonFilePath }?: {
    url?: string;
    method?: string;
    timeout?: string;
    jsonFilePath?: string;
}) => void;
