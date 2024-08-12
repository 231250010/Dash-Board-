"use strict";


import { Project } from "../entity/project";
import {User} from "../entity/user";
import {Task} from "../entity/task";

Object.defineProperty(exports, "__esModule", { value: true });

const ormConfig = {
    keys: "test",
    koa: {
        port: 7001, // 你想要使用的端口号
      },
      cors: {
        origin: '*', // 或者你可以设置为允许的特定域名
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      },
      bodyParser: {
        enableTypes: ['json', 'form', 'text'],
        jsonLimit: '10mb',   // Increase the limit to 10MB for JSON payloads
        formLimit: '10mb',   // Increase the limit to 10MB for form payloads
        textLimit: '10mb',   // Increase the limit to 10MB for text payloads
      },
    orm:{keys: '114514',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'wuyue050829',
    database: 'test',
    entities: [User,Project,Task],
    synchronize: true, // 生产环境下建议关闭
    },
    jwt: {
      secret: 'hahah12h23qwa', // replace with a strong secret key
      expiresIn: '1h', // token expiry time
    }
};


exports.default = ormConfig;