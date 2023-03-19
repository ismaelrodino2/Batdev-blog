"use client";
import React, { useCallback, useEffect, useState } from "react";

import dynamic from "next/dynamic";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AlertColor,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { use } from "react";
import { Category } from "@/utils/types";
import { Tiptap } from "../components/Editor";
import { createPost, ErrorBar, SuccessBar } from "@/utils/Store";
import Image from "next/image";
import { FaExpand } from "react-icons/fa";
import { MdOutlineExpandMore } from "react-icons/md";
import { SelectCategory } from "../components/SelectCategory";
import { State } from "../components/Account";
import { AlertBar } from "../components/AlertBar";

type PropTypes = {
  categories: Array<Category>;
};

const NewPostClient = ({ categories }: PropTypes) => {
  const [togglechecked, setToggleChecked] = useState(false);
  const [description, setDescription] = useState("");
  const [postPicture, setPostPicture] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor | undefined>();
  const [state, setState] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const [open, setOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<Array<Category>>(
    []
  );

  const submitPost = async () => {
    setIsLoading(true);
    if (postPicture && description && title && selectedCategories) {
      try {
        await createPost(
          description,
          togglechecked,
          postPicture,
          title,
          selectedCategories
        );
        setDescription("");
        setPostPicture(null);
        setTitle("");
        setSelectedCategories([]);
        setToggleChecked(false);
        setClearEditor(true)
        SuccessBar(setMessage, setSeverity, "Post created!", setOpen);
      } catch (err) {
        console.log(err);
        ErrorBar(setMessage, setSeverity, "Oops some error occurred.", setOpen);
      } finally {
        setIsLoading(false);
      }
    } else if (!postPicture && description && title && selectedCategories) {
      ErrorBar(
        setMessage,
        setSeverity,
        "Oops, add a picture for your post.",
        setOpen
      );
    } else {
      ErrorBar(setMessage, setSeverity, "Oops, some field is empty.", setOpen);
    }
  };

  const [clearEditor, setClearEditor] = useState(false)
  return (
    <div className="container mx-auto px-4">
      {isLoading && <CircularProgress />}

      <div className="flex flex-col items-center flex-wrap bg-neutral py-4 text-primary gap-4 px-4">
        <h1>Create post</h1>
        <AlertBar
          open={open}
          setOpen={setOpen}
          message={message}
          severity={severity}
        />

        <div className="w-full">
          <Accordion>
            <AccordionSummary
              expandIcon={<MdOutlineExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h5>Post Photo</h5>
            </AccordionSummary>
            <AccordionDetails>
              <>
                <div className="flex  items-center justify-center bg-grey-lighter py-2">
                  <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-secondary hover:text-white">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">
                      Select a file
                    </span>
                    <input
                      type="file"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        e.target.files && setPostPicture(e.target.files[0])
                      }
                      className="hidden"
                    />
                  </label>
                </div>
                {postPicture ? (
                  <div className="relative py-2 flex justify-center">
                    <Image
                      src={URL.createObjectURL(postPicture)}
                      alt="Main picture of the post"
                      className="w-[300px] h-[300px]"
                      width={100}
                      height={100}
                    />
                  </div>
                ) : null}
              </>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="flex w-full justify-between">
          <TextField
            id="outlined-password-input"
            label="Title"
            type="text"
            onChange={(e: any) => setTitle(e.target.value)}
            value={title}
            className={"flex self-start"}
          />
          {categories && (
            <SelectCategory
              categories={categories}
              setSelectedCategories={setSelectedCategories}
              selectedCategories={selectedCategories}
            />
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex">
            <FormControlLabel
              control={
                <Switch
                  checked={togglechecked}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setToggleChecked(event.target.checked)
                  }
                />
              }
              label="Allow comments"
            />
          </div>

          <Tiptap setDescription={setDescription} description={description} clearEditor={clearEditor} setClearEditor={setClearEditor} />

          <Button
            className="w-fit"
            variant="contained"
            onClick={submitPost}
            component="label"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPostClient;
