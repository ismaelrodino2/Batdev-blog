import { SideHome } from "@/app/components/SideHome";
import prisma from "@/utils/prisma";
import { Category, Post as PostType } from "@/utils/types";
export const dynamic = 'force-static'

import  dynamicpage from "next/dynamic";

const Comments = dynamicpage(() => import("@/app/components/Comments"), {
  ssr: false,
});







import DateCircle from "@/app/components/DateCircle";
import dateFormat from "dateformat";
import Image from "next/image";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";

type CategoryOnPost = {
  postId: string;
  categoryId: string;
  assignedAt: string;
  assignedBy: string;
  category: Category;
};
export async function generateStaticParams() {
  try {
    const res = await prisma.post.findMany({
      include: {
        author: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    const utf8Encode = (unicodeString: string): string => {
      if (typeof unicodeString != "string")
        throw new TypeError("parameter ‘unicodeString’ is not a string");

      const utf8String = unicodeString
        .replace(/[\u0080-\u07ff]/g, (c) => {
          let cc = c.charCodeAt(0);
          return String.fromCharCode(0xc0 | (cc >> 6), 0x80 | (cc & 0x3f));
        })
        .replace(/[\u0800-\uffff]/g, (c) => {
          let cc = c.charCodeAt(0);
          return String.fromCharCode(
            0xe0 | (cc >> 12),
            0x80 | ((cc >> 6) & 0x3f),
            0x80 | (cc & 0x3f)
          );
        });
      return utf8String;
    };
    const posts = JSON.parse(utf8Encode(JSON.stringify(res)));
    const paths = posts?.map((el: PostType) => {
      return { id: el.id }
    });
    return paths;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}

async function getPost(params: { id: string }) {
  const { id } = params!;

  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        author: true,
      },
    });

    const utf8Encode = (unicodeString: string): string => {
      if (typeof unicodeString != "string")
        throw new TypeError("parameter ‘unicodeString’ is not a string");

      const utf8String = unicodeString
        .replace(/[\u0080-\u07ff]/g, (c) => {
          let cc = c.charCodeAt(0);
          return String.fromCharCode(0xc0 | (cc >> 6), 0x80 | (cc & 0x3f));
        })
        .replace(/[\u0800-\uffff]/g, (c) => {
          let cc = c.charCodeAt(0);
          return String.fromCharCode(
            0xe0 | (cc >> 12),
            0x80 | ((cc >> 6) & 0x3f),
            0x80 | (cc & 0x3f)
          );
        });
      return utf8String;
    };

    const response = utf8Encode(JSON.stringify(post));

    return JSON.parse(response);
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}

async function getCommentsData(params: { id: string }) {
  const { id } = params!;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: id,
      },
      include: {
        author: true,
      },
    });
    return comments;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
}

export const revalidate = 60; // revalidate this page every 60 seconds


const Post = async ({ params }: any) => {
  const postPromise = await getPost(params);
  const commentsPromise = await getCommentsData(params);
  const post = postPromise;
  const comments: any = commentsPromise;
  if (!post) {
    notFound();
  }

  const cleanDesc = sanitizeHtml(post?.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
  });

  const cleanTitle = (title: string) => {
    return sanitizeHtml(title);
  };

  return (
    <div className="bg-white">
      <div className="mx-5 bg-neutral px-2 ">
        <div className="container mx-auto max-w-md md:max-w-7xl">
          <div className="flex flex-col items-center">
            <div className="pt-[70px] pb-[35px]">
              <DateCircle>
                {dateFormat(post?.createdAt, "paddedShortDate")}
              </DateCircle>
            </div>
            <hr className=" mb-5 w-10 self-center border-solid border-r-primary" />
            <h2
              className="pb-5"
              dangerouslySetInnerHTML={{
                __html: cleanTitle(post?.title),
              }}
            />
            <div className="flex flex-wrap justify-center gap-5 text-center">
              <p className="text-[14px]">
                By
                <span className="text-primary-medium">{post?.author.name}</span>
              </p>
              <p className="pb-[70px] text-[14px]">
                Tags:
                <span className="text-primary-medium">
                  {post?.categories &&
                    post?.categories.map(
                      (cat: CategoryOnPost, index: number) => {
                        return (
                          <span key={cat.category.id}>
                            {(index && ", ") + cat.category.name}{" "}
                          </span>
                        );
                      }
                    )}
                </span>
              </p>
            </div>
          </div>
          <div className=" flex flex-col gap-20 px-6 md:flex-row">
            <div className="md:w-[73%]">
              <div className="flex  ">
                <div className="flex w-full flex-col">
                  {post?.postPic && (
                    <div className="relative h-[480px] w-full ">
                      <Image
                        src={post?.postPic}
                        alt="Post picture image"
                        layout="fill"
                      />
                    </div>
                  )}
                  <div className="flex w-full">
                    <div className="flex w-full">
                      <div className="flex flex-col mr-4 py-[50px] ProseMirror w-full overflow-auto">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: cleanDesc,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-auto flex flex-col items-end bg-neutral md:w-[27%]">
              <SideHome
                setCategoryName={undefined}
                categories={undefined}
                categoryName={undefined}
              />
            </div>
          </div>
        </div>
        <div className="md:w-[73%] w-full px-6">
          <Comments comments={JSON.stringify(comments)}  />
        </div>
      </div>
    </div>
  );
};

export default Post;
