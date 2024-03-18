import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import databaseService from "../appwrite/DatabaseService";

import { useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databaseService.getPostById(slug).then((p) => {
        if (p) {
          setPost(p);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return (
    <>
      {post ? (
        <div style={{ "margin": "2px" }}>
          <Container>
            <PostForm post={post} />
          </Container>
        </div>
      ) : null}
    </>
  );
}
