"use client";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Modal,
  Snackbar,
  Switch,
  Typography,
} from "@mui/material";

import dynamic from "next/dynamic";

const EditPost = dynamic(() => import("./EditPost"), {
  ssr: false,
});
import { useState } from "react";
import { Category, Post, PostNoCat } from "@/utils/types";
import { BsFillTrashFill } from "react-icons/bs";
import { State } from "./Account";
type PropTypes = {
  posts: string;
  categories: Array<Category>;
};

export const MyPosts = ({ categories, posts: postsProp }: PropTypes) => {
  const [posts, setPosts] = useState<PostNoCat[]>(JSON.parse(postsProp));
  console.log(posts);

  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor | undefined>();
  const [state, setState] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open: openSnack } = state;
  const handleCloseSnack = () => {
    setState({ ...state, open: false });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      {posts &&
        posts.map((el: PostNoCat) => {
          return (
            <div key={el.id}>
              <div className="border-solid border-primary rounded-lg	 border my-4 p-4">
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={openSnack}
                  onClose={handleCloseSnack}
                  message={message}
                  autoHideDuration={2000}
                  key={vertical + horizontal}
                >
                  <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: "100%" }}
                  >
                    {message}
                  </Alert>
                </Snackbar>

                <EditPost
                  el={JSON.stringify(el)}
                  setPosts={setPosts}
                  categories={categories}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};
