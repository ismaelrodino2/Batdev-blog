import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import React, { useEffect, useState, useCallback } from "react";

import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";
import Image from "@tiptap/extension-image";
import { SlPicture } from "react-icons/sl";
import { Button, Dialog, TextField } from "@mui/material";

const MenuBar = ({ editor }: any) => {
  const [open, setOpen] = useState(false);
  const [imgLink, setImgLink] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const addImage = useCallback(() => {
    // const url = window.prompt("URL");
    if (imgLink) {
      editor.chain().focus().setImage({ src: imgLink }).run();
    }
    handleClose();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="m-2 flex gap-2 flex-col">
          <h6>Add image Url</h6>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setImgLink(e.target.value)
            }
            id="outlined-basic"
            label="Image Url"
            variant="outlined"
          />
          <Button
            className="w-fit"
            variant="contained"
            onClick={addImage}
            component="label"
          >
            Submit
          </Button>
        </div>
      </Dialog>
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is_active" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is_active" : ""}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is_active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is_active" : ""}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is_active" : ""
          }
        >
          <FaHeading />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is_active" : ""
          }
        >
          <FaHeading className="heading3" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is_active" : ""}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is_active" : ""}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is_active" : ""}
        >
          <FaQuoteLeft />
        </button>
        <button onClick={() => setOpen(true)}>
          <SlPicture />
        </button>
      </div>
      <div>
        <button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

type PropTypes = {
  setDescription: (desc: string) => void;
  description: string;
  clearEditor: boolean;
  setClearEditor: (value: boolean) => void;
};

export const Tiptap = ({
  setDescription,
  description,
  clearEditor,
  setClearEditor,
}: PropTypes) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Image],
    content: description,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
    },
  });

  useEffect(() => {
    if (clearEditor) {
      editor?.commands.clearContent();
      setClearEditor(false);
    }
  }, [clearEditor]);


  return (
    <div className="textEditor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
