import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/DatabaseService";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData);
 
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      databaseService.getPostById(slug).then((p) => {
        if (p) setPost(p);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost =  () => {
     databaseService.deletePostById(post.$id).then((status) => {
      if (status) {
        databaseService.deleteFile(post.featuredImage).then((status) => {
          if (status) navigate("/");
          else console.error("Post featured image file deletion failed.");
        });
      } else console.error("Post deletion failed.");
    });
  };

  return post ? (
    <div style={{ "padding": "5px" }}>
      <Container>
        <div
          style={{
            "margin": "2px",
            "border": "1px solid red",
            "textAlign": "center",
          }}
        >
          <img
            src={databaseService.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
          {isAuthor && (
            <div style={{ "display": "inline-block" }}>
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="blue" style={{ "margin": "1px" }}>
                  Edit
                </Button>
              </Link>

              <Button
                bgColor="red"
                onClick={deletePost}
                style={{ "margin": "1px" }}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div style={{ "margin": "2px" }}>
          <h2>{post.title}</h2>
        </div>
        <div style={{ "margin": "2px" }}>
          <pre>{parse(post.content)}</pre>
        </div>
      </Container>
    </div>
  ) : null;
}
