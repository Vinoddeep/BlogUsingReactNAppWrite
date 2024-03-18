import React from "react";
import { Link } from "react-router-dom";
import databaseService from "../appwrite/DatabaseService"


export default function PostCard({post}){

    return (<>
           <h2>List of Posts</h2>
            <Link to={`/post/${post.$id}`}>
                <div>
                    <div style={{'textAlign':'justify'}} >
                        <img  src={databaseService.getFilePreview(post.featuredImage)} alt={post.title}/>
                    </div>
                    <h2>{post.title}</h2>
                </div>
            </Link>
        </>
    )
}