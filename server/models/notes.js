const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS notes (
    userID INT NOT NULL,
    noteID INT NOT NULL AUTO_INCREMENT,
    emailId VARCHAR(255) NOT NULL,
    noteContent VARCHAR(255) NOT NULL,
    CONSTRAINT userPK PRIMARY KEY(noteID)
  ); `
  await con.query(sql);
}
createTable();

// grabbing all users in database
async function getAllnote() {
  const sql = `SELECT * FROM notes;`
  let notes = await con.query(sql);
  console.log(notes)
}

// Create  User - Registering
async function register(note) {
    // console.log(note);
  let cnote = await getNote(note);
  if(cnote.length > 0) throw Error("Note already in use");
console.log(cnote);
  const sql = `INSERT INTO notes (userID, emailId, noteContent)
    VALUES (${note.userID}, "${note.emailId}", "${note.noteContent}");
  `
  await con.query(sql);
}



// Update User function
async function editnote(note) {
  let sql = `UPDATE notes 
    SET noteContent = "${note.noteContent}"
    WHERE emailId = "${note.emailId}"
  `;

  await con.query(sql);
  let updatednote = await getNote(note);
  return updatednote[0];
}

// Delete User function
async function deletenote(note) {
  let sql = `DELETE FROM notes
    WHERE emailId = "${note.emailId}"
  `;
  await con.query(sql);
}

// Useful Functions
async function getNote(note) {
  let sql;

  console.log(note.emailId);
    sql = `
      SELECT * FROM notes
       WHERE emailId = "${note.emailId}"
    `;
  console.log(sql);
  return await con.query(sql);  
}

module.exports = { getAllnote, register, editnote, deletenote};