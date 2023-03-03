import { useState } from "react";

const UserAuhenticated = JSON.parse(localStorage.getItem('userdetails'));

console.log(UserAuhenticated);

const UserAuthDetails = UserAuhenticated ? 
    {
        displayName: `${UserAuhenticated.user.first_name} ${UserAuhenticated.user.last_name}`,
        email: UserAuhenticated.user.email,
        photoURL: '/assets/images/avatars/avatar_default.jpg',
    }
   
  
  :
    {
        displayName: '',
        email: '',
        photoURL: '',
      } 
  ;

  const tokenAuthenticate = UserAuhenticated ?
    {
         headers: { Authorization: `Bearer ${UserAuhenticated.token}` }
    }
    :
    {
        headers: null,
    }
    ;



export { UserAuthDetails,tokenAuthenticate }

