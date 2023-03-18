import { Category } from "@/utils/types";


import dynamic from "next/dynamic";

const NewPostClient = dynamic(() => import("./ClientPage"), {
  ssr: false,
});
async function getCategoriesData() {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
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
