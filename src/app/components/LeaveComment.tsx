import { Alert, AlertColor, CircularProgress, Snackbar } from "@mui/material";
import { useSession } from "@supabase/auth-helpers-react";
import { usePathname, useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useState } from "react";
import { State } from "./Account";
import nookies from "nookies";
import { Comments } from "@/utils/types";
import { ErrorBar, getUser, SuccessBar } from "@/utils/Store";
import { AlertBar } from "./AlertBar";

const LeaveComment = ({
  setCommentsCopy,
}: {
  setCommentsCopy: (comment: any) => void;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const path = usePathname();
  const postId = path?.split("/post/").pop();

  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  const [severity, setSeverity] = useState<AlertColor | undefined>();
  const [message, setMessage] = useState<string>("");


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const userId = getUser()?.user?.user.id;

    const { "supabase-auth": token } = parseCookies();
    let user;
    if (token) {
      user = JSON.parse(token);
    }

    try {
      const res = await fetch("/api/comments/createComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, postId, userId }),
      });
      const comment = await res.json();
      const commentWithAuthor = comment;
      commentWithAuthor["author"] = user.user.user;
      setCommentsCopy((current: any) => [...current, commentWithAuthor]); //remove in frontend also

      setText("");

      SuccessBar(
        setMessage,
        setSeverity,
        "Comment created!",
        setOpen
      );
    } catch (err) {
      console.error(err);
      setMessage("Oops some error occurred.");
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

  const handleChange = (e: any) => {
    setText(e.currentTarget.value);
  };

  return (
    <div className=" bg-neutral-low-high flex flex-col pb-8">
      <AlertBar
        open={open}
        setOpen={setOpen}
        message={message}
        severity={severity}
      />

      {isLoading && <CircularProgress />}
      <div className="flex flex-col items-center pb-[30px] ">
        <h5 className="uppercase text-base">Leave a Comment</h5>

        <form className="w-full" onSubmit={handleSubmit} action="">
          <div className="flex pt-4 h-[250px]">
            <textarea
              onChange={handleChange}
              value={text}
              placeholder="Comment *"
              cols={45}
              rows={8}
              className="flex-1 h-full p-4 rounded-sm outline-none focus:border-b-2 focus:border-b-primary-medium bg-white text-primary focus:placeholder-[#c0c9cc] resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="font-extrabold uppercase tracking-[2px] text-[13px] bg-white w-full py-3 mt-3 text-primary hover:bg-secondary hover:text-white transition-all duration-[340ms] ease-in-out"
          >
            post comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveComment;
