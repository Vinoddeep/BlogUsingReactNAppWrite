import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import databaseService from "../appwrite/DatabaseService";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    databaseService.getPosts().then((postList) => {
      console.log(postList.documents);
      if (postList) {
        setPosts(postList.documents);
      }
    });
  }, []);

  return (
    <div>
      <h2>All Posts...</h2>
      <Container>
        <div style={{ margin: "5px" }}>
          {/* Mapping over posts and returning PostCard component */}
          {posts.map((post) => (
            <div key={post.$id} style={{ "margin": "2px" }}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
