const connection = require('./connection');

const printQuestionMarks = (num) => {
      let arr = [];

      for (let i = 0; i < num; i++) {
            arr.push("?");
      }

      return arr.toString();
}

// Helper function for SQL syntax.
const objToSql = (ob) => {
      let arr = [];

      for (let key in ob) {
            if (Object.hasOwnProperty.call(ob, key)) {
                  arr.push(key + "=" + ob[key]);
            }
      }

      return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
      all: (tableInput, cb) => {
            let queryString = "SELECT * FROM " + tableInput + ";";
            connection.query(queryString, (err, result) => {
                  if (err) {
                        throw err;
                  }
                  cb(result);
            });
      },
      create: (table, cols, vals, cb) => {
            let queryString = "INSERT INTO " + table;

            queryString += " (";
            queryString += cols.toString();
            queryString += ") ";
            queryString += "VALUES (";
            queryString += printQuestionMarks(vals.length);
            queryString += ") ";

            console.log(queryString);

            connection.query(queryString, vals, (err, result) => {
                  if (err) {
                        throw err;
                  }
                  cb(result);
            });
      },
      // An example of objColVals would be {name: panther, sleepy: true}
      update: (table, objColVals, condition, cb) => {
            let queryString = "UPDATE " + table;

            queryString += " SET ";
            queryString += objToSql(objColVals);
            queryString += " WHERE ";
            queryString += condition;

            console.log(queryString);
            connection.query(queryString, (err, result) => {
                  if (err) {
                        throw err;
                  }

                  cb(result);
            });
      }
};

// Export the orm object for the model (cat.js).
module.exports = orm;