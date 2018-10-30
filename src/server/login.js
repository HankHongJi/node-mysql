'use strict';

const query = require('../../db/connect');

/**
 * 用户注册
 * @param {string} params.nickname  昵称
 * @param {string} params.password  密码
 */
const userLogin = async function (params) {
    console.log(params);
    try {
        const r = await query(
            'select uid from usermessage where nickname = ? and password = ?', [params.nickname, params.password]
        );
        return r;
    } catch (e) {
        console.log(`错误为${e}`);
        return 1;
    }
}

module.exports = userLogin;