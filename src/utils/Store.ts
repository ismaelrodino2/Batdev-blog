"use client";

import { State } from "@/app/components/Account";
import { useAuth } from "@/utils/Auth/AuthProvider";
import { AlertColor } from "@mui/material";
import { parseCookies, setCookie } from "nookies";
import { supabase } from "./supabase";
import { Category } from "./types";

export async function createPost(
  description: string,
  togglechecked: boolean,
  postPicture: File,
  title: string,
  categories: Array<Category>
) {
 
  try{
    let url;
    let key;
    const file = postPicture;
    const fileExt = file?.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
  
    const res = await supabase.storage.from("posts").upload(filePath, file);
    if (res.error) {
      console.log(res.error);
      return;
    }
  
    key = res.data?.path;
    url = supabase.storage.from("posts").getPublicUrl(res?.data?.path);
  
      const userCookie = (await getUser()).user.user
  
  
    const data = {
      id: userCookie?.id,
      user: userCookie?.name,
      title,
      content: description,
      postPic: url ? url?.data.publicUrl : null,
      postPicKey: key ? key : null,
      allowComments: togglechecked,
      categories,
    };
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
          });
      return await res.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  }catch(err){
    console.log(err)
    return err
  }
  

}




export const SignOut = async() =>{
  const { signOut }: any = useAuth();

    const { error } = await signOut();

    setCookie(null, "supabase-auth", "", {
      path: "/",
    });

    if (error) {
      console.error("ERROR signing out:", error);
    }
  

  window.location.reload();

}


export const getUser = () =>{
  const { "supabase-auth": token } = parseCookies();
  if (token) {
    try {
       return  JSON.parse(token);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error("Invalid JSON:", error.message);
      } else {
        throw error;
      }
      return null
    }
  }

}

export const editPost = async(description:string, allowComments:boolean, title:string, authorId:string, postPicture:any, postPicKey:string, selectedCategories:Array<Category>, postId:string) =>{

  let url;
  let key;

  const userCookie = (await getUser()).user.user
  //if there's no picture, upload
  if (typeof postPicture==="string" || !postPicture) {//dont update pic

    await fetch("/api/posts/update/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({description, allowComments, title, id: userCookie?.id, authorId, postId, content:description, user:userCookie, categories:selectedCategories}),
    });
 return

} else {//update pic
  const file = postPicture;
  const fileExt = file?.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

    const res = await supabase.storage.from("posts").update(postPicKey, file);
    key = res.data?.path;
    if (res.error) {
      console.log(res.error);

      return;
    }
    url = supabase.storage.from("posts").getPublicUrl(res?.data?.path);


    const data = {
      user: userCookie,
      authorId:  userCookie?.id,
      title,
      content: description, 
      postPic: url ? url?.data.publicUrl : null,
      postPicKey: key ? key : null,
      allowComments,
      categories:selectedCategories,
      postId
    };
  
   
    const updatedPost = await fetch("/api/posts/updateWithPic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
     await updatedPost.json();
  
  return 








  }


//  create post




}



 export const SuccessBar = (setMessage:(message:string)=>void,setSeverity:(severity:AlertColor | undefined)=>void , message:string, setOpen:(value:boolean)=>void) =>{
  setMessage(message);
  setOpen(true)
  setSeverity("success");

 }

 export const ErrorBar = (setMessage:(message:string)=>void,setSeverity:(severity:AlertColor | undefined)=>void , message:string, setOpen:(value:boolean)=>void) =>{
  setMessage(message);
  setSeverity("error");
  setOpen(true)


 }