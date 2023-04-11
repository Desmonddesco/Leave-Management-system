
function SubmitLeave(){

    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var startleave = document.getElementById("startdate").value;
    var lastleave = document.getElementById("lastdate").value;
    var reason = document.getElementById("reason").value;
    var select = document.getElementById('typeofleave');
    var value = select.options[select.selectedIndex].value;
    var totalsdaysofleave = 21;
    var count = 0;
   if (value==1) {
    select ="Annual leave"
   }
   if (value==2) {
    select ="Sick leave"
   }
   if (value==3) {
    select ="Maternity leave"
   }
   if (value==4) {
    select ="Family responsibility leave"
   }   

   // Calculate days taken
   const date1 = new Date(startleave);
   const date2 = new Date(lastleave);
   const diffTime = Math.abs(date2 - date1);
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

   
  

   //adding to database
    db.collection("Leave Requests/").add({
        Firstname:firstname,
        Lastname:lastname,
        First_Day_Of_Leave:startleave,
        Last_Day_Of_Leave:lastleave,
        Type_Of_Leave:select, 
        Reason_Of_leave:reason,
        Total_Days_Of_leave:totalsdaysofleave,
        Total_Days_Of_Leave_Taken:diffDays,
        Leave_Status:"Pending", 
        Count:count
        //Count:count++
   
  }).then(()=>{
     //Clearing the inputs
    document.getElementById("reason").value="";
    swal("success", "Your " + select +" of " +diffDays + " days has been succesfully requested to your employer", 
    "success")

    document.getElementById("firstname").value= "";
    document.getElementById("lastname").value="";
    document.getElementById("startdate").value= "";
    document.getElementById("lastdate").value="";
    document.getElementById("reason").value="";
    document.getElementById('typeofleave').value="";



  })
  
    //Retrieving from dates from database
    db.collection("Leave Requests/").get().then((info)=>{
        var daystaken=info.data().Total_Days_Of_Leave_Taken;
        document.getElementById("daysleavetaken").value = daystaken;
    })
}

function calender() {
    location.href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=MyEvent&details=Eventdescriptiontextee&dates=20230215/20230220&location=SouthAfrica"
}

