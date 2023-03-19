"use client";

import Image from "next/image";
import { useState } from "react";
import moment from "moment";

import { parseCookies } from "nookies";
import dynamic from "next/dynamic";
import { ErrorBar, getUser, SuccessBar } from "@/utils/Store";
import { AlertColor, Button } from "@mui/material";
import { BsFillTrashFill } from "react-icons/bs";
import { ModalDelete } from "./ModalDelete";
import { Loading } from "./Loading";
import { AlertBar } from "./AlertBar";

const LeaveComment = dynamic(() => import("./LeaveComment"), {
  ssr: false,
});

type Comment = {
  id: number;
  content: string;
  authorId: string;
  createdAt: Date;
  author: {
    id: string;
    avatarUrl: string;
    avatarKey: string;
    email: string;
    name: string;
    updatedAt: string;
    createdAt: string;
  };
};


type PropTypes = {
  comments: string;
};

const Comments = ({ comments: commentsString }: PropTypes) => {
  const comments: Array<Comment> = JSON.parse(commentsString);
  const [commentsCopy, setCommentsCopy] = useState<Array<Comment>>(
    comments || []
  );

  const session = getUser()?.user?.user;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<Comment|null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (comment: Comment) => {
    setOpenDelete(true);
    setCommentToDelete(comment);
  };
  const handleCloseDelete = () => setOpenDelete(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);

    const data = {
      id: commentToDelete?.id,
      authorId: commentToDelete?.authorId,
      userId: session.id,
    };
    try {
      await fetch("/api/comments/delete/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      handleCloseDelete();
      setCommentsCopy(
        (
          current: Array<Comment> //remove in frontend also
        ) =>
          current.filter(
            (comment) => comment.id !== commentToDelete?.id
          )
      );
      SuccessBar(setMessage, setSeverity, "Comment deleted.", setOpen);
    } catch (err) {
      console.log(err);
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

  return (
    <div
      className={`bg-neutral-low-high flex flex-col md:max-w-full mx-auto ${
        !session && "pb-[57px]"
      }`}
    >
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
      <div className="flex flex-col items-center pb-[30px] ">
        <h5 className="uppercase text-base">
          {commentsCopy.length} comment(s)
        </h5>
        <hr className="border border-solid border-r-primary w-10 mt-[5px]" />
      </div>

      {commentsCopy?.map((comment: Comment) => {
        return (
          <div key={comment.id}>
            <div className="flex flex-row pb-4 px-4">
              <div>
                <div className="md:h-[80px] mr-7 h-16 w-16 md:w-[80px] relative ">
                  <Image
                    src={comment.author.avatarUrl || "/image/user.png"}
                    alt=""
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col self-center w-full  md:ml-[70px]">
                <div className="flex items-center md:justify-between w-full justify-between">
                  <h6>{comment.author.name}</h6>
                  <div className="flex gap-2">
                    <span className="text-gray font-medium tracking-[px] text-xs">
                      {moment(comment.createdAt).fromNow()}
                    </span>

                    {session && <button onClick={() => handleOpenDelete(comment)}>
                      <BsFillTrashFill />
                    </button>}
                  </div>
                </div>
                <div className="py-2">
                  <p className="font-normal">{comment.content}</p>
                </div>
              </div>
            </div>

            <hr className="h-1  md:ml-[140px] py-4 text-[#E9EAEB] w-auto" />
          </div>
        );
      })}
      {session && <LeaveComment setCommentsCopy={setCommentsCopy} />}
    </div>
  );
};

export default Comments;
