import prisma from "@/utils/prisma";
import { Category } from "@/utils/types";


import dynamic from "next/dynamic";

const NewPostClient = dynamic(() => import("./ClientPage"), {
  ssr: false,
});
async function getCategoriesData() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (err) {
    console.log(err);
    return [];
  } finally{
    await prisma.$disconnect()
  }
}

const NewPost = async () => {
  const categories: Category[] = await getCategoriesData();

  return (
    <div>
      <NewPostClient categories={categories} />
    </div>
  );
};

export default NewPost;
