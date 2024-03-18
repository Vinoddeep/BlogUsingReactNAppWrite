import React,{useState} from "react"
import { Link,useNavigate } from "react-router-dom"
import { login as authLogin } from "../store/authSlice"
import {Button,Input } from "./index"
import {  useDispatch } from "react-redux"
import authService from "../appwrite/AuthService"
import {useForm} from "react-hook-form"

export default function Login(){

    const navigate= useNavigate();
    const dispatch =useDispatch();
    const {register,handleSubmit}=useForm();
    const [error,setError]=useState();

    const login = async (data) =>{
        setError("");

        try{
            
            const session=await authService.login(data)
            if(session)
            {
                const userData = await authService.getCurrentUser();
                if(userData)
                {
                    dispatch(authLogin(userData))
                    navigate("/")
                }
            }
        }
        catch(error){
          setError(error);
        }
    }

    return(
        <>
        <div>
           
            <div>
                <span>Logo</span>
            </div>
            <div>
                <Link to="/signup" >Sign Up</Link>
            </div>
            <br/>
            <br/>
            <h2>Login</h2>
            {error && <p style={{'color':'red'}}>{error}</p>}

            <form onSubmit={handleSubmit(login)} style={{'margin':'5px'}}>
                
                <Input label="Email :" type="email" placeholder="Enter your email" 
                {...register("email",{required:true,validate:{matchPatern:(value)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email address must be a valid address"}})} />

                <Input label="Password :" type="password" placeholder="Enter your password"
                {...register("password",{
                    required:true,
                })} />

                <Button type="submit" className="w-full" >Sign in</Button>
            </form>
        </div>
        </>
    )
}