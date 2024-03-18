import React from "react";
import { Container,LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header()
{
  const authStatus = useSelector((state)=>state.status)
  const navigate =useNavigate();
  const navItems=[
    {
        name:'Home',
        slug:"/",
        active:true
    },
    {
        name:'Login',
        slug:"/login",
        active:!authStatus
    },{
        name:'Signup',
        slug:"/signup",
        active:!authStatus
    },{
        name:'Posts',
        slug:"/posts",
        active:authStatus
    },{
        name:'Add Post',
        slug:"/add-post",
        active:authStatus
    }, 
]
    return (
        <header style={{'backgroundColor':'gray'}} >
            <Container>
                <nav>
                    <div style={{'display':"flex"}} >
                        <div style={{'marginRight':'4px'}} >
                            <Link to='/' >Logo</Link>
                        </div>
                        <ul>
                            {
                            navItems.map((x)=>
                                x.active?(
                                    <li key={x.name} >
                                        <button style={{"display":'inline-block','margin':'2px'}} onClick={()=>navigate(x.slug)}>{x.name}</button>
                                    </li>
                                ):null
                            )
                        }

                        {authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        ) }
                        </ul>
                    </div>

                    
                </nav>
            </Container>
        </header>
    )
}
