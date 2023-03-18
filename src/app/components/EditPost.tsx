import {
  Alert,
  AlertColor,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Modal,
  Snackbar,
  Switch,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { Category, Post, PostNoCat } from "@/utils/types";
import { BiEdit } from "react-icons/bi";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { BsFillTrashFill } from "react-icons/bs";
import { State } from "./Account";
import { useRouter } from "next/navigation";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import { Tiptap } from "./Editor";
import { editPost, ErrorBar, getUser, SuccessBar } from "@/utils/Store";
import Image from "next/image";
import { PostImage } from "./PostImage";
import { SelectCategory } from "./SelectCategory";
import { AlertBar } from "./AlertBar";
import { Loading } from "./Loading";
import { ModalDelete } from "./ModalDelete";

type Props = {
  el: string;
  setPosts: (value: PostNoCat[] | any) => PostNoCat[]|void;
  categories: Array<Category>;
};

const EditPost = ({ el: elProp, setPosts, categories }: Props) => {
  const el: PostNoCat = JSON.parse(elProp);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor | undefined>();
  const [description, setDescription] = useState(el.content);
  const [title, setTitle] = useState(el.title);
  const [postPicture, setPostPicture] = useState<string | File>(el.postPic);
  const [selectedCategories, setSelectedCategories] = useState<Array<Category>>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const aa = await editPost(
        description,
        togglechecked,
        title,
        el.authorId,
        postPicture,
        el.postPicKey,
        selectedCategories,
        el.id
      );
      handleCloseEdit();
      SuccessBar(setMessage, setSeverity, "Post updated!", setOpen);
    } catch (err) {
      ErrorBar(
        setMessage,
        setSeverity,

        "Oops some error occurred.",
        setOpen
      );
    } finally {
      setIsLoading(false);
    }
  };

  const { darkModeValue } = useContext(DarkModeContext);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    minWidth: "280px",
    height: "30%",
    bgcolor: "background.paper",
    border: `2px solid ${darkModeValue ? "#f5f5f5" : "#222222"}`,
    boxShadow: 24,
    color: darkModeValue ? "#f5f5f5" : "#222222",
    p: 4,
  };

  const Poststyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    overflow: "auto",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "70%",
    bgcolor: "background.paper",
    border: `2px solid ${darkModeValue ? "#f5f5f5" : "#222222"}`,
    boxShadow: 24,
    color: darkModeValue ? "#f5f5f5" : "#222222",
    p: 4,
  };
  const styles = `
  	.MuiFormControlLabel-label{
    color: ${darkModeValue ? "#f5f5f5" : "#222222"};
  }
    .ProseMirror{
  
      color: ${darkModeValue ? "#f5f5f5" : "#222222"};
    }
    
  
  `;

  const handleOpenEdit = () => setOpenEdit(true);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const [state, setState] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open: openSnack } = state;
  const handleCloseSnack = () => {
    setState({ ...state, open: false });
  };
  const handleDelete = async () => {
    setIsLoading(true);

    const userId = getUser()?.user?.user.id;

    const data = {
      id: el.id,
      authorId: el.authorId,
      userId,
    };
    try {
      await fetch("/api/posts/delete/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      handleCloseDelete;
      const filterPosts = (current: PostNoCat[]): PostNoCat[] => {
        const value = current.filter((post) => post.id !== el?.id);
        console.log(value);
        return value;
      };

      setPosts((prev: PostNoCat[]) => filterPosts(prev));

      SuccessBar(setMessage, setSeverity, "Post deleted.", setOpen);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      ErrorBar(
        setMessage,
        setSeverity,

        "Oops some error occurred.",
        setOpen
      );
    }
  };
  const [togglechecked, setToggleChecked] = useState(el.allowComments);

  return (
    <div>
      <style>{styles}</style>
      <Loading isLoading={isLoading} />

      <AlertBar
        setOpen={setOpen}
        message={message}
        severity={severity}
        open={open}
      />

      <ModalDelete
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        handleDelete={handleDelete}
      />

      {
        //modal 2
      }

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Poststyle}>
          <div className="flex flex-col gap-4">
            <FormGroup>
              <FormLabel component="legend">Allow comments:</FormLabel>
              <div className="text-primary">
                <FormControlLabel
                  control={
                    <Switch
                      checked={togglechecked}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setToggleChecked(event.target.checked)
                      }
                    />
                  }
                  label={togglechecked.toString()}
                  color={"#fff"}
                />
              </div>
            </FormGroup>
            <TextField
              label="Title"
              type="text"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
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
            <PostImage postPicture={postPicture} />
            <SelectCategory
              categories={categories}
              setSelectedCategories={setSelectedCategories}
              selectedCategories={selectedCategories}
            />
            <Tiptap setDescription={setDescription} description={description} />
            <div className="flex justify-end">
              <Button
                variant="contained"
                component="label"
                color="primary"
                onClick={handleEdit}
              >
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <div className="flex x justify-between">
        <div className="flex flex-col max-w-[66%] overflow-auto">
          <h1>{el.title}</h1>
          <HTMLEllipsis
            unsafeHTML={el.content.replace(/<img .*?>/g, "")}
            maxLine="2"
            ellipsis="..."
            ellipsisHTML="<i style='color:#74C2BD'> [...] </i>"
            basedOn="letters"
          />
          <p>comments: {el.allowComments.toString()}</p>
        </div>
        <div className="flex flex-col justify-between gap-4 max-w-[33%]">
          <Button
            variant="contained"
            onClick={handleOpenEdit}
            color="primary"
            component="label"
            startIcon={<BiEdit />}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            onClick={handleOpenDelete}
            color="secondary"
            component="label"
            startIcon={<BsFillTrashFill />}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
export default EditPost;
