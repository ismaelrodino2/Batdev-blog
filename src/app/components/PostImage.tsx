import Image from "next/image";
import NextImage from "next/image";

type PropTypes = {
  postPicture: string | File;
};

export const PostImage = ({ postPicture }: PropTypes) => {
  if (postPicture && typeof postPicture !== "string") {
    return (
      <div className="relative ">
        <Image
          src={URL.createObjectURL(postPicture)}
          alt="Main picture of the post"
          className="w-[300px] h-[300px]"
          width={100}
          height={100}
        />
      </div>
    );
  } else if (postPicture && typeof postPicture === "string") {
    return (
      <div className="relative ">
        <Image
          src={postPicture}
          alt="Main picture of the post"
          className="w-[300px] h-[300px]"
          width={100}
          height={100}
        />
      </div>
    );
  } else {
    return null;
  }
};
