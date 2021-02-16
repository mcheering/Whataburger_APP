const orm = require('../config/orm')


const burger = {
      all: (cb) => {
            orm.all("burgers", (res) => {
                  cb(res);
            });
      },
      create: (cols, condition, cb) => {
            orm.create("burgers", cols, condition, (res) => {
                  cb(res);
            });
      },
      update: (objColVals, condition, cb) => {
            orm.update("burgers", objColVals, condition, (res) => {
                  cb(res);;
            });
      }
};

module.exports = burger;