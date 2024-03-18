import React from "react"
import { useDispatch } from "react-redux"
import authService from "../../appwrite/AuthService"
import { logout } from "../../store/authSlice"

export default function LogoutBtn()
{
    const dispatch =useDispatch();
    const logoutHandler= ()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        }).catch((error)=>{
            console.log(error)
        });
        }
    return(<button onClick={logoutHandler}>Logout</button>)
}