"use client"

import Link from "next/link";
import DateCircle from "./DateCircle";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import Image from "next/image";
import dateFormat from "dateformat";
import sanitizeHtml from "sanitize-html";
import { Categories, Category, Post } from "@/utils/types";

const cleanTitle = (desc: string) => {
  return sanitizeHtml(desc);
};

type PropTypes = {
  post: Post;
};

export default function Posts ({ post }: PropTypes) {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center">
        <div className="hidden lg:block ml-[40px] self-start">
          <DateCircle>
            {dateFormat(new Date(post.createdAt), "paddedShortDate")}
            {/* m/d/a */}
          </DateCircle>
        </div>
        <div className="flex flex-col w-full md:ml-[40px]">
            <Link href={`/post/${post.id}`}>
              {post.postPic ? (
                <div className="relative">
                  <Image
                    className="w-full h-[420px] hover:opacity-80 transition-all ease-in-out duration-300"
                    src={post.postPic}
                    alt=""
                    width={100}
                    height={100}
                    unoptimized
                  />
                </div>
              ) : (
                ""
              )}
            </Link>
          
          <div className="flex ">
            <div className="flex flex-col">
              <div className="flex  text-center pt-8 pb-4 gap-5 flex-wrap  items-center">
                <p className="text-secondary text-[14px] md:hidden">
                  {dateFormat(new Date(post.createdAt), "paddedShortDate")}
                </p>
                <p className="text-[14px] text-accent">
                  By
                  <span className="text-secondary pl-1">
                    {post.author.name}
                  </span>
                </p>
                <p className="text-[14px] text-accent">
                  Tags:
                  <span className="text-secondary pl-1">
                    {post.categories.map((cat: Categories, index: number) => {
                      return (
                        <span key={cat.categoryId}>
                          {(index && ", ") + cat.category.name}{" "}
                        </span>
                      );
                    })}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Link href={`/post/${post.id}`}>
                  <h2  data-testid="posts" className="hover:text-secondary transition-all ease-in-out duration-300">
                    {cleanTitle(post.title)}
                  </h2>
                </Link>
                <div className=" flex flex-wrap pb-24">
                  <HTMLEllipsis
                    unsafeHTML={post.content.replace(/<img .*?>/g, "")} 
                    maxLine="2"
                    ellipsis="..."
                    ellipsisHTML="<i style='color:#74C2BD'> [...] </i>"
                    basedOn="letters"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
