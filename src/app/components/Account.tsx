"use client";
import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database, User } from "@/utils/types";
import {
  Alert,
  AlertColor,
  Button,
  Snackbar,
  SnackbarOrigin,
  TextField,
} from "@mui/material";
import { ErrorBar, getUser, SuccessBar } from "@/utils/Store";
import { AlertBar } from "./AlertBar";

type ProfileTypes = { data: User };
export interface State extends SnackbarOrigin {
  open: boolean;
}
export default function Account() {
  const data = getUser()?.user?.user;
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>(data?.name || "");
  const [avatarUrl, setAvatarUrl] = useState<string|File>(data?.avatarUrl);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  async function updateProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const data = {
        name,
        updated_at: new Date().toISOString(),
      };

      await fetch("/api/users/updateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });


      SuccessBar(
        setMessage,
        setSeverity,
        "Profile updated!",
        setOpen
      );
    } catch (error) {
      ErrorBar(
        setMessage,
        setSeverity,
        "Oops some error occurred.",
        setOpen
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const updateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //e.target.files[0]
    if (!e.target.files) return;
    setAvatarUrl(e.target.files[0]);
    if (!avatarUrl) {
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      const res = await supabase.storage.from("avatars").upload(filePath, file);
      if (!res.error) {
        SuccessBar(
          setMessage,
          setSeverity,
          
          "Profile updated!",
          setOpen
        );
      }
      if (res.error) {
        ErrorBar(
          setMessage,
          setSeverity,
          
          "Error updating the data!",
          setOpen
        );

        return;
      }
      const url = supabase.storage
        .from("avatars")
        .getPublicUrl(res?.data?.path);

      const data = {
        avatarKey: res?.data?.path,
        avatarUrl: url?.data.publicUrl,
      };
      try {
        await fetch("/api/users/updateUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        SuccessBar(
          setMessage,
          setSeverity,
          
          "Profile updated!",
          setOpen
        );
      } catch (err) {
        ErrorBar(
          setMessage,
          setSeverity,
          
          "Oops some error occurred.",
          setOpen
        );
        console.log(err);
      }
    } else if (avatarUrl) {
      if (!data.avatarKey) return;
      try {
        await supabase.storage
          .from("avatars")
          .update(data.avatarKey, e.target.files[0]);
        SuccessBar(setMessage, setSeverity,  "User updated", setOpen);
      } catch (err) {
        ErrorBar(
          setMessage,
          setSeverity,
          
          "Oops some error occurred.",
          setOpen
        );
      }
    }
  };
  //preciso pegar as info q ja tem nome e imagem pra dps tentar mudar ou upload novo

  function previewFile() {
    if (typeof avatarUrl !== "string" && avatarUrl) {
      let result;
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        result = reader.result;
      });
      reader.readAsDataURL(avatarUrl);
      return result;
    }
  }

  return (
    <div className="bg-neutral py-4">
      <div className=" container mx-auto px-4">
        <AlertBar open={open} setOpen={setOpen} message={message} severity={severity} />
        <div className="flex ">
          <TextField
            id="standard-helperText"
            label="User name"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="pl-4">
            <Button
              component="label"
              variant="contained"
              onClick={updateProfile}
            >
              Upload Name
            </Button>
          </div>
        </div>
        <div className="pt-4">
          {typeof avatarUrl == "string" && avatarUrl !== null ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="h-96" src={avatarUrl} alt="" />
          ) : null}
          {typeof avatarUrl !== "string" && avatarUrl !== null ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewFile()} alt="" />
          ) : null}
          <div className="pt-4">
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={updateImage}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
