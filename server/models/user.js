const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS users (
    userID INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(255),
    emailId VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT userPK PRIMARY KEY(userID)
  ); `
  await con.query(sql);
}
createTable();

// grabbing all users in database
async function getAllUsers() {
  const sql = `SELECT * FROM users`;
  let users = await con.query(sql);
  console.log(users)
}

// Create  User - Registering
async function register(user) {
  let cUser = await getUser(user);
  if(cUser.length > 0) throw Error("Username already in use");

  const sql = `INSERT INTO users (userName, emailId, password)
    VALUES ("${user.userName}", "${user.emailId}", "${user.password}");
  `
  await con.query(sql);
  return await login(user);
}

// Read User -- login user
async function login(user) { // {userName: "sda", password: "gsdhjsga"}
  let cUser = await getUser(user); //[{userName: "cathy123", password: "icecream"}]
  
  if(!cUser[0]) throw Error("Username not found");
  if(cUser[0].password !== user.password) throw Error("Password incorrect");
  console.log(cUser);
  return cUser[0];
}

// Update User function
async function editUser(user) {
  let sql = `UPDATE users 
    SET userName = "${user.userName}"
    WHERE emailId = "${user.emailId}"
  `;

  await con.query(sql);
  let updatedUser = await getUser(user);
  return updatedUser[0];
}

// Delete User function
async function deleteUser(user) {
  let sql = `DELETE FROM users
    WHERE emailId = "${user.emailId}"
  `;
  await con.query(sql);
}

// Useful Functions
async function getUser(user) {
  console.log(user.emailId);
  console.log("in getUser ");

  let sql = `
    SELECT * FROM users WHERE emailId = "${user.emailId}"`;
    // console.log(sql);
  return await con.query(sql);
}

/*
let cathy = {
  userID: 5,
  userName: "cathy123",
  password: "icecream"
}; 

login(cathy);
*/

module.exports = { getAllUsers, login, register, editUser,??deleteUser};