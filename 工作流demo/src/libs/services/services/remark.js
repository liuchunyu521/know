/**
 * 批语
 */
import api from '../api';
import config from '../config';
/**
 * 请求批语列表
 * @param req
 *        appCode
 *        userCode
 *        size
 */
export function getRemarkList(req) {
    return api.get(config.WORKFLOW_REMARK_LIST_URL, req);
}
/**
 * 删除批语
 * @param id 批语id
 */
export function deleteRemark(id) {
    return api.delete(config.WORKFLOW_REMARK_DELETE_URL(id));
}
/**
 * 保存批语
 * @param req
 *       text
 *       userCode
 */
export function saveRemark(req) {
    return api.post(config.WORKFLOW_REMARK_SAVE_URL(), req);
}
/**
 * 设置星标
 * @param req
 *         id   批语id
 *         flag   标记 0 | 1
 */
export function starRemark(req) {
    return api.post(config.WORKFLOW_REMARK_STAR_URL(), req);
}
