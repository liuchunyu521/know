/**
 * 批语
 */
/**
 * 请求批语列表
 * @param req
 *        appCode
 *        userCode
 *        size
 */
export declare function getRemarkList(req: any): any;
/**
 * 删除批语
 * @param id 批语id
 */
export declare function deleteRemark(id: string): any;
/**
 * 保存批语
 * @param req
 *       text
 *       userCode
 */
export declare function saveRemark(req: any): any;
/**
 * 设置星标
 * @param req
 *         id   批语id
 *         flag   标记 0 | 1
 */
export declare function starRemark(req: any): any;
