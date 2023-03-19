import { InferGetServerSidePropsType } from "next";
import { use } from "react";
import { cookies as nextcookies } from "next/headers";

async function getCategoriesData() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (err) {
    console.log(err);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

async function getPosts() {
  const nextCookies = nextcookies();
  const cookies = nextCookies.get("supabase-auth")?.value;

  try {
    if (!cookies) return null;

    const posts = await prisma.post.findMany({
      where: {
        authorId: JSON.parse(cookies).user.user.id,
      },
      include: {
        author: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return posts;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function UpdatePost() {
  const posts = await getPosts();
  const categories: Array<Cat> = await getCategoriesData();
  console.log("asdsad", categories);
  return (
    <div className=" bg-neutral">
      <div className="container mx-auto px-4 py-4">
        <h1>My posts</h1>
        <MyPosts posts={JSON.stringify(posts)} categories={categories} />
      </div>
    </div>
  );
}

import { MyPosts } from "../components/Myposts";
import prisma from "@/utils/prisma";
import { Cat, Category } from "@/utils/types";
