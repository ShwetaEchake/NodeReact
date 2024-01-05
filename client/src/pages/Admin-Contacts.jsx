import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';


export const AdminContacts = () => {

  const [contactData , setContactData]  = useState([]);
  const { authorizationToken } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts",{
        method :"GET",
        headers: {
          Authorization : authorizationToken,
        },
      });
      const data = await response.json();  //json to object
      console.log(`contact data ${data}`);
      if(response.ok){
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

   // delete the user on delete button
   const deleteContactById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method : "DELETE",
          headers : {
            Authorization: authorizationToken,
          },
        });

        if(response.ok){
          getContactsData();
          toast.success("deleted Successfully");
        }else{
          toast.error("Not deleted");
        }
    } catch (error) {
      console.log(error);
    }
};

 useEffect(() => {
  getContactsData();
 },[]);


 return (
  <>
  <section className="admin-users-section">
    <div className="container">  
        <h1>Admin Contact Data</h1>
    </div>
    <div className="container admin-users">
       <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Message</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contactData.map((curContactData, index) => {
            const {_id, username,email,message} = curContactData;
              return (
                  <tr key = {index}>
                    <td> {username} </td>
                    <td> {email} </td>
                    <td> {message} </td>
                    <td><button className="btn" onClick={() => deleteContactById(_id) }> Delete </button>  </td>
                  </tr>
              );
            })}
        </tbody>
       </table>
    </div>
  </section>
   
   
  </>
  );
  };
  
  