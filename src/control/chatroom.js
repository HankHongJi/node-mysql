'use strict';

const { getArtic, getViewnum, saveView } = require('../server/chatroom');
const { resEmp, resFun, resErr } = require('../common/response');
const isEmpty = require('../common/isEmpty');

/**
 * 获取全部文章
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const getArtics = async function (req, res) {
    const params = {
        limit: 10,
        page: 0
    }
    Object.assign(params, req.query);
    const r = await getArtic(params);
    if (r === 1) return resErr(res);
    const data = {
        list: [...r],
        pageIndex: +params.page,
        pageSize: +params.limit
    }
    return resFun(res, 0, {...data});
}

/**
 * 浏览文章
 * @param {object} req  请求头 
 * @param {object} res  响应头
 */
const saveViews = async function (req, res) {
    const params = {
        articId: req.body.id | ''
    }
    const isempty = isEmpty(params);
    if (isempty) {
        return resEmp(res);
    }
    const r = await getViewnum(params);
    if (r === 1 || !r[0]) return resErr(res);
    let result;
    if (r[0]) {
        result = await saveView({viewnum: ++r[0].viewnum, articId: params.articId});
    }
    if (result === 1) return resErr(res);
    return resFun(res, 0, '浏览成功');
}

module.exports = {
    getArtics,
    saveViews
};