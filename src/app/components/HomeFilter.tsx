"use client";
import { useContext, useState, useEffect, useMemo } from "react";
import { Inter } from "@next/font/google";
import { Category, Post } from "@/utils/types";

const inter = Inter({ subsets: ["latin"] });

import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { SideHome } from "./SideHome";
const Posts = dynamic(() => import("./Posts"), {
  ssr: false,
});

import { Pagination, Stack, Typography } from "@mui/material";
import Header from "./Header";
import dynamic from "next/dynamic";
import { SearchContext } from "@/contexts/SearchContext";

type Props = {
  categories: Array<Category>;
  posts: string;
};

const HomeFilter = ({ categories, posts: poststring }: Props) => {
  const posts: Array<Post> = JSON.parse(poststring); //avoid Only plain objects can be passed to Client Components from Server Components
  const { searchValue } = useContext(SearchContext);
  const [categoryName, setCategoryName] = useState<string>("");
  const [arrayToFilter, setArrayToFilter] = useState<Array<Post>>(posts);

  const filterByCategory = (array: Array<Post>) => {
    let arr;
    if (categoryName !== "") {
      arr = array.filter((item) =>
        item.categories.find((el) => {
          return el.category.name === categoryName;
        })
      );
    } else {
      arr = array;
    }
    return arr;
  };

  const filtersearchName = (array: Array<Post>) => {
    if (searchValue !== "") {
      return array.filter(
        (el: { title: string }) =>
          el.title.toLowerCase().indexOf(searchValue?.toLowerCase()) != -1
      );
    } else {
      return array;
    }
  };



  
  useEffect(() => {
    let result = posts;
    result = filterByCategory(result);
    result = filtersearchName(result);
    setArrayToFilter(result);
  }, [searchValue, categoryName, poststring]); 


  return (
    <div className="">
      <div className="">
        <Header
          firstTxt="A place for your Development stories"
          title="blog of ismael rodino"
        />

        <div className="bg-neutral px-4 md:px-0">

          <div className=" mx-auto  flex max-w-7xl  flex-col md:flex-row">
            <div className="order-2 w-full md:order-1 md:w-[80%]">
              {arrayToFilter &&
                arrayToFilter.map((el: Post) => {
                  return (
                    <div key={el.id} className="">
                      <Posts post={el} />
                    </div>
                  );
                })}
            </div>
            <div className="order-1 flex w-full flex-col items-center justify-end self-start bg-neutral md:order-2 md:ml-[80px] md:mr-[40px] md:w-[20%]">
              <SideHome
                categoryName={categoryName}
                categories={categories}
                setCategoryName={setCategoryName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;
