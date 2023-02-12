function view_requests(){

    db.collection("Leave Requests/").get().then((AllRecords)=>{
    const list =document.getElementById("requests")
    
  
    var div ="";
    var html ="";

    AllRecords.forEach((element)=>{
       
        div =`
        <ul class="list-unstyled chat-list mt-2 mb-0" >
        <li class="clearfix">
        <div class="about">
            <div class="name">${element.data().Firstname}
             ${element.data().Lastname} requested for a ${element.data().Total_Days_Of_Leave_Taken}
             ${element.data().Type_Of_Leave} starting from 
             ${element.data().First_Day_Of_Leave} until ${element.data().Last_Day_Of_Leave} </div>                                      
        </div>
     
         </li>           
        </ul>
       
    `
        html += div
        list.innerHTML =html
    })

    })
 }
 view_requests()