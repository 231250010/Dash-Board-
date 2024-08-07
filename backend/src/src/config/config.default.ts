"use strict";

import {User} from "../entity/user";

Object.defineProperty(exports, "__esModule", { value: true });

const ormConfig = {

    koa: {
        port: 7001, // 你想要使用的端口号
      },
      cors: {
        origin: '*', // 或者你可以设置为允许的特定域名
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      },

    orm:{keys: '114514',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Myhongqiche123!',
    database: 'test',
    entities: [User],
    synchronize: true, // 生产环境下建议关闭
    }
};

exports.default = ormConfig;