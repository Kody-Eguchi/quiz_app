const db = require('../connection');



const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

//query database to get all users
const getAllUsers = function() {
  return db.query(`SELECT * FROM users;`)
  .then(res => {
    console.log(res.rows);
    return res.rows;
  })
  .catch(err => {
    console.error("Error: ", err.message);
  })
};

module.exports = { getUsers, getAllUsers };
