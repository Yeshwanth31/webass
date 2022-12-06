const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS notes (
    userID INT NOT NULL,
    noteID INT NOT NULL,
    noteContent VARCHAR(255) NOT NULL,
    CONSTRAINT userPK PRIMARY KEY(userID)
  ); `
  await con.query(sql);
}
createTable();

// grabbing all users in database
async function getAllnote() {
  const sql = `SELECT * FROM notes;`;
  let notes = await con.query(sql);
  console.log(notes)
}

// Create  User - Registering
async function register(note) {
  let cnote = await getNote(note);
  if(cnote.length > 0) throw Error("Note already in use");

  const sql = `INSERT INTO notes (userID, noteID, noteContent)
    VALUES ("${note.userID}", "${note.noteID}", "${note.noteContent}");
  `
  await con.query(sql);
  return await login(note);
}

// Read User -- login user
async function login(note) {
  let cnote = await getNote(note);
  
  if(!cnote[0]) throw Error("Note not found");
  if(cnote[0].password !== note.password) throw Error("Password incorrect");

  return cnote[0];
}

// Update User function
async function editnote(note) {
  let sql = `UPDATE notes 
    SET noteContent = "${note.noteContent}"
    WHERE noteId = ${note.noteId}
  `;

  await con.query(sql);
  let updatednote = await getNote(note);
  return updatednote[0];
}

// Delete User function
async function deletenote(note) {
  let sql = `DELETE FROM notes
    WHERE noteId = ${note.noterId}
  `
  await con.query(sql);
}

// Useful Functions
async function getNote(note) {
  let sql;

  if(note.noteId) {
    sql = `
      SELECT * FROM notes
       WHERE noteId = ${note.noteId}
    `
  } else {
    sql = `
    SELECT * FROM notes 
      WHERE noteContent = "${note.noteContent}"
  `;
  }
  return await con.query(sql);  
}

module.exports = { getAllnote, login, register, editnote, deletenote};




















