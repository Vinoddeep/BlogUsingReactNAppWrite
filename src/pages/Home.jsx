import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/DatabaseService";
import { Container, PostCard } from "../components";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    databaseService.getPosts().then((allPosts) => {
      if (allPosts) {
        setPosts(allPosts.documents);
      }
    });
  }, []);

  return (
    <div style={{ "margin": "5px" }}>
      <Container>
        <div>
          {posts.map((post) => {
            <div key={post.$id} style={{ "margin": "5px" }}>
              <PostCard {...post} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
}
