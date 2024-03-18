import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div>
      {label && <label>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
             initialValue={defaultValue} 
            apiKey='okrjc3pg16ij59fh259vavqyytsrjeuafnmlab5txd1bmhi4' 
            init={{
              branding: false,
              height: 500,
              width:1000,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code, full screen",
                "insertdatetime,media table paste code help wordcount",
              ],
              toolbar:
                "undo redu | blocks | image | formatsselect | bold italic backcolor forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family : Helvetica,Arial,sans-serif; font-size:14px;}",
            }}
             onEditorChange={onChange}
          ></Editor>
        )}
      />
    </div>
  );
}
