function viewLeave(){
    
    
        db.collection("Leave Requests/" ).get().then((AllRecords)=>{
        const list =document.getElementById("requests")
        var div ="";
        var html ="";

        

        
        AllRecords.forEach((currentRecord)=>{

           
            div =`
            <tr>
            <th><i class="fa fa-edit" aria-hidden="true" onclick="Accept_Status('${currentRecord.id}')"></i></th>
           
            <td><b>${currentRecord.data().Firstname} ${currentRecord.data().Lastname} </b></td>
            <td>
            <div class="tm-status-circle moving">
            </div>${currentRecord.data().Leave_Status}
            </td>
        <td><b>${currentRecord.data().Total_Days_Of_Leave_Taken} day/s</b></td>
            <td><b>${currentRecord.data().Total_Days_Of_leave} day/s</b></td>
            <td>${currentRecord.data().First_Day_Of_Leave}</td>
            <td><b>${currentRecord.data().Last_Day_Of_Leave}</b></td>
            <td><b>${currentRecord.data().Type_Of_Leave}</b></td>
           
  
            <td><i class="fa fa-trash" aria-hidden="true" onclick="remove_leave('${currentRecord.id}')"></i></td>
                    
        </tr> `
            html += div
            list.innerHTML =html
        })

    

        })
    }
viewLeave()




function Accept_Status(id)
{
    
 
  Swal.fire({
    title: 'Do you want to Accept the leave?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Accept',
    denyButtonText: `Decline`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Accepted!', '', 'success')
      db.collection("Leave Requests/").doc(id).get().then((info)=>{
             var daystaken;
             var remainingdays;
             var leavedays;
               leavedays = info.data().Total_Days_Of_leave;
              daystaken = info.data().Total_Days_Of_Leave_Taken;

   

              remainingdays = leavedays - daystaken;

              db.collection("Leave Requests/").doc(id).update({
                Total_Days_Of_leave:remainingdays,
                Leave_Status:"Accepted" }).then(function()
                {
                  location.reload();
                })
              })
      
    } else if (result.isDenied) {
      Swal.fire('Declined', '', 'error')
        db.collection("Leave Requests/").doc(id).update({
                Leave_Status:"Declined"
        }).then(function()
        {
          location.reload();
        })
    }
  })

}
   
function remove_leave(id)
{


      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          db.collection("Leave Requests/").doc(id).delete()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            
          ).then(function()
          {
            location.reload();
          })
        }
      })
}

function searchAlert(){
  Swal.fire("Search is currently not working, consult your developer!").then(function()
  {
    document.getElementById("employee").value="search an employee";
  })

}