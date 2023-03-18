import prisma from "@/utils/prisma";
import { CatArr, Category, User } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function aa(req: NextApiRequest, res: NextApiResponse) {
  type DataType = {
    id: string;
    title: string;
    content: string;
    allowComments: boolean;
    postPic: string;
    postPicKey: string;
    user: string;
    categories: Array<Category>;
    authorId: string;
    postId: string;
  };

  const data: DataType = req.body;
  let catArr: CatArr = [];
  data?.categories?.forEach((el: Category) => {
    catArr.push({
      assignedBy: data.user,
      assignedAt: new Date(),
      category: {
        connect: {
          id: el.id,
        },
      },
    });
  });
  if (data.authorId === data.id) {
    try {
      await prisma.categoriesOnPosts.deleteMany({
        where: {
          postId: data.postId,
        },
      });
      const post = await prisma.post.update({
        data: {
          title: data.title,
          content: data.content,
          postPic: data.postPic,
          postPicKey: data.postPicKey,
          allowComments: data.allowComments,
          categories: {
            create: catArr,
          },
        },
        where: {
          id: data.postId,
        },
      });
      res.status(200).json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    } finally {
      await prisma.$disconnect();
      res.end();
    }
  } else {
    res.end();
  }
}
