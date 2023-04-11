

function login(){
    var email=document.getElementById("email").value
    var password=document.getElementById("password").value;

    if (email =="" || password =="" )
    {
        swal.fire("please enter all the fields correctly!","","error");
    }
    else{
  
    auth.signInWithEmailAndPassword(email,password).then(()=>{
        location.href="admin.html"
    }).catch(function(error){
      newFunction();
    })
    function newFunction(){
        swal.fire("User not found,Please type your details correctly","","error");
    }
  
  }
}

function forgetPassword()
{
  var email = document.getElementById("email").value;
  if (email =="")
  {
      swal.fire("Enter your email before you can reset your email!","","error");
  }
  else{
    auth.sendPasswordResetEmail(email).then(()=>{
    swal.fire("success","Password link sent successfully","success");

        }).catch((error)=>{
         swal.fire(error.message)
        })
    }
}


function lsRememberMe() {
  
const rmCheck = document.getElementById("rememberMe").value;
var email = document.getElementById("email").value;

if (localStorage.checkbox && localStorage.checkbox !== "") {
  rmCheck.setAttribute("checked", "checked");
  email = localStorage.username;
} else {
  rmCheck.removeAttribute("checked");
  email = "";
}

  if (rmCheck.checked && email !== "") {
    localStorage.username = email;
    localStorage.checkbox = rmCheck;
  } else {
    localStorage.username = "";
    localStorage.checkbox = "";
  }
}
lsRememberMe()

function ifLoggedIn(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) 
        {
            location.href="admin.html";
        } 
        else
         {
            swal.fire("Login as an admin", "", "error").then(function()
            {
              location.href="login.html";
            })
       
        }    
        
      })
  }

  function logout()
{
  auth.signOut().then(()=>{
    swal.fire({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal.fire("Poof! You are signed out!", {
            icon: "success",
          });
          setTimeout(() => {
            location.href="index.html"
        }, 5000);
        } 
        else {
          swal.fire("Great. You're still  logged in");
        }
      });
   
  })
}