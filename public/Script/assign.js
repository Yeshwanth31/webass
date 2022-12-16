let nav = document.querySelector('nav');

if(getCurrentUser()) {
  nav.innerHTML = `
    <ul>
      <li><a href="homepage.html">Home</a></li>
      <li><a href="Login.html">Login</a></li>
      <li><a href="Register.html">Register</a></li>

      
      <li><a id="logout-btn">Logout</a></li>
    </ul>
  `
} else {
  nav.innerHTML = `
    <ul>
    <li><a href="homepage.html">Home</a></li>
    <li><a href="Login.html">Login</a></li>
    <li><a href="Register.html">Register</a></li>
    </ul>
  `
}

// Fetch method implementation:
async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if(response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
} 

// logout event listener
let logout = document.getElementById("logout-btn");
if(logout) logout.addEventListener('click', removeCurrentUser)

// stateful mechanism for user
// logging in a user
function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// getting current user function
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

// logout function for current user
function removeCurrentUser() {
  localStorage.removeItem('user');
  window.location.href = "Login.html";
}

class User {
    constructor(userName, emailId, password) {  
      this.userName = userName;
      this.emailId = emailId;
      this.password = password;
    }
  
    getUsername() {
      return this.userName;
    }
  }
  
  // login functionality
  let loginForm = document.getElementById("login-form");
  if(loginForm) loginForm.addEventListener('submit', login);
  
  function login(e) {
    e.preventDefault();
  
    let emailId = document.getElementById("emailId").value; //  change username to email
    let password = document.getElementById("pwd").value;
    let user = new User(emailId, password);
  
    fetchData("/user/login", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "Note.html";
    })
    .catch((err) => {
      let p = document.querySelector('.error');
      p.innerHTML = err.message;
    }) 
  }
   
  // register functionality
  let regForm = document.getElementById("reg-form");
  if(regForm) regForm.addEventListener('submit', register);
  
  function register(e) {
    e.preventDefault();
  
    let userName = document.getElementById("username").value;  
    let emailId = document.getElementById("emailId").value;
    let password = document.getElementById("pwd").value;
    let user = new User(userName, emailId, password);
  
    fetchData("/user/register", user, "POST")
    .then((data) => {
      setCurrentUser(data);

      alert("registration success")
      
      window.location.href = "Note.html";
    })
    .catch((err) =>{
      let p = document.querySelector('.error');
      p.innerHTML = err.message;
    })
  }

  //Note Functionality
  class Note{
    constructor(emailId,noteContent) {
      this.emailId=emailId;
      this.noteContent=noteContent;
    }
    getNotes(){
      return this.noteContent;
    }
  }
  let user=getCurrentUser();
  let note=document.getElementById("noteForm");
  if(note) note.addEventListener('submit',notePageFunction)
  function notePageFunction(e){
    e.preventDefault();
    let noted=document.getElementById('note').value;
    obj=getCurrentUser();
    emailId=obj.emailId;
    const note=new Note(noted,emailId);
    fetchData("/notes/register", note, "POST")
    .then((data) => {
      alert("Note Added")
      window.location.href="Note.html"
    })
    .catch((err) => {
      console.log(err);
    })
    document.getElementById("noteForm").requestFullscreen();
  }
  if(user&&note) getallnotes();
  function getallnotes(){
    let notedata=document.getElementById('note');
    fetchData("/notes/getNote",user,"POST")
    .then((data) => {
      console.log(data);
      for(let i=0;i<data.length;i++) {
        notedata.value+=data[i].noteContent;
      }
    })
  }



/*
class assign5
{
    constructor(fname,lname,emailid,pwd,sub,note)
    {
        this.FName=fname;
        this.LName=lname;
        this.Email=emailid;
        this.Password=pwd;
        this.Submit=sub;
        this.Note=note;
    }
    getFName(){
        return this.FName;
    }
    getLName(){
        return this.LName;
    }
    getEmail(){
        return this.Email;
    }
    getPassword()
    {
        return this.Password;
    }
    getSubmit()
    {
        return this.Submit;
    }
    getNote()
    {
        return this.Note;
    }
    setFName(fname){
        this.FName=fname;
    }
    setLName(lname){
        this.LName=lname;
    }
    setEmail(emailid){
        this.Email=emailid;
    }
    setPassword(pwd){
        this.Password=pwd;
    }
    setSubmit(sub){
        this.Submit=sub;
    }
    setNote(note){
        this.Note=note;
    }

}
let create= document.getElementById("login-form");
if(create) create.addEventListener('submit',login)

function login(e){
 e.preventDefault();
 let em1=document.getElementById("email").value;
 let pwd=document.getElementById("pwd").value;

 
 console.log(`${em1}`);
 console.log(`${pwd}`);
 

}

let Reg=document.getElementById("regsiter-form");
if(Reg) Reg.addEventListener('submit',breg)

function breg(r){
    r.preventDefault();
    let FN= document.getElementById("fname").value;
    let LN=document.getElementById("lname").value;
    let Em=document.getElementById("emailid").value;
    let Ps=document.getElementById("pwd").value;
    let Nt=document.getElementById("sub").value;
    
    
    console.log(`${FN}`);
    console.log(`${LN}`);
    console.log(`${Em}`);
    console.log(`${Ps}`);
    console.log(`${Nt}`);   
    Reg.reset();
    
}
let UserN= document.getElementById("note-form");
if(UserN) UserN.addEventListener("submit",page)

function page(b){
    b.preventDefault();
    let Notepage= document.getElementById("textnote").value;
    
    console.log(`${Notepage}`);
    UserN.reset();

}


const user_btn = document.getElementById("1");
if(user_btn) user_btn.addEventListener('click',getUsers);


const note_btn = document.getElementById("2");
if(note_btn) note_btn.addEventListener('click',getNote);

function getUsers(){
    fetch("http://localhost:3000/user/")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err)=> console.log(err))

    
    .catch((err)=> console.log(err));
}

function getNote(){
    fetch("http://localhost:3000/notes/")
    .then((res)=> res.json())
    .then((data) => console.log(data))
    .catch((err)=> console.log(err))
}
*/