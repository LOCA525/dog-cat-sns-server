var Sequelize = require('sequelize');
var path = require('path');
var fs = require('fs');
var dotenv = require('dotenv');

dotenv.config(); //LOAD CONFIG

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00', //한국 시간 셋팅
    operatorsAliases: Sequelize.Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
);

let db = [];

fs.readdirSync(__dirname)
  .filter(file => {
    // index.js를 제외하고 돌면서 모델안 모델들 생성
    return file.indexOf('.js') && file !== 'index.js';
  })
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db 모델 데이터베이스 동기화, 테이블이 없으면 테이블 생성
db.sequelize.sync();

module.exports = db;
