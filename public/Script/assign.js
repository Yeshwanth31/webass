const user_btn = document.getElementById("1");
user_btn.addEventListener('click',getUsers);


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
    
    //let regi= new bala(FU1,Lr,eml1,pwd,pset);
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
    //let usr= new bala(Notepage);
    console.log(`${Notepage}`);
    UserN.reset();

}


function getUsers(){
    fetch("http://localhost:3000/user/")
    .then((res)=> res.json())
    .then((data) => console.log(data))
    .catch((err)=> console.log(err))
}

function getNote(){
    fetch("http://localhost:3000/notes/")
    .then((res)=> res.json())
    .then((data) => console.log(data))
    .catch((err)=> console.log(err))
}