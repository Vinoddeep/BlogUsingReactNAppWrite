import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/DatabaseService";
import parse from "html-react-parser"


export default function PostForm({ post })
{
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title,
      slug: post?.$id,
      content: post?.content,
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const [error, setError] = useState("");

  const formSubmit = async (data) => {
    let dbPost;
    if (post) {  //update post
      let file = null;
      if (data.image[0]) {
        file = await databaseService.uploadFile(data.image[0]);
      }

      if (file) {
        databaseService.deleteFile(post.featuredImage);
      }

       dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : null,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } 
    else { // add post
      let file = null;
      if (data.image[0]) {
        file = await databaseService.uploadFile(data.image[0]);
      }

      if (file) {
        data.featuredImage = file.$id;

         dbPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
        });
      }
      else
      {
        console.error("File uploading failed");
      }

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
      else
      {
        console.error("Post creation failed.");
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .toLowerCase()
        .replace(/[^\w]+/g, ' ')
        .trim() 
        .replace(/\s+/g, '-');
    }
    return "";
}, []);

  React.useEffect(() => {
    const subcription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <div>
        <h2>Post</h2>
        {error && <p style={{ "color": "red" }}>{error}</p>}

        <form onSubmit={handleSubmit(formSubmit)} style={{ 'margin': "5px" }}>
          <Input
            label="Title :"
            type="text"
            placeholder="Enter post title"
            {...register("title", {
              required: true,
            })}
          />

          <Input
            label="Slug :"
            type="text"
            placeholder="Enter post slug"
            {...register("slug", {
              required: true,
            })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />

          <RTE lable="Content : " name="content" control={control} defaultValue={getValues("content")} ></RTE>

          <Input
            label="Featured Image :"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", {
              required: !post,
            })}
          />

          {post && (
            <div>
              <img
                src={databaseService.getFilePreview(post.featuredImage)}
                alt={post.title}
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status : "
            {...register("status", { required: true })}
          />

          <Button type="submit" bgColor={post? "blue":"green"} className="w-full">
            {post?"Update Post":"Add Post"}
          </Button>
        </form>
      </div>
    </>
  );
}
