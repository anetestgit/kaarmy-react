import {useEffect, useState,createContext } from "react";
import axios from "axios";
import { ApiUrl } from "./Axiosconfig";

export const StateContext = createContext();




let updateUserDetails;
export default function AuthUserDetails (){


    const UserAuhenticated = JSON.parse(localStorage.getItem('userdetails'));
    const tokenAuthenticate = UserAuhenticated ?
    {
         headers: { Authorization: `Bearer ${UserAuhenticated.token}` }
    }
    :
    {
        headers: null,
    }
    ;

    
    const [authdetails , setAuthdetails] = useState([])

    useEffect( () => {
        axios.get(`${ApiUrl}loginUserDetails`,tokenAuthenticate)
        .then(response => {
  
          if (response.data.statusCode === 200) {
            setAuthdetails(response.data.authDetails);
             console.log(response.data.authDetails);

            updateUserDetails = response.data.authDetails;

            
          }

         
  
        })
        .catch(error => {
          console.log(error);
  
        });
    }, []);

    // return updateUserDetails;

    const passVal ='Aeesh good man';

    return(
      <StateContext.Provider value={passVal} />
    );
  

    


}


//  console.log(updateUserDetails);

// const AuthUserDetails = updateUserDetails ? 

//   {
//     name: 'Aneesh',
//     age : '11'
//   }

//   :

//   {
//     name: 'Aneesh',
//     age : '11'
//   };




