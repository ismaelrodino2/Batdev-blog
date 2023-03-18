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
import HomeFilter from "./HomeFilter";

type Props = {
  categories: Array<Category>;
  posts: string;
};

const HomePagination = ({ categories, posts: poststring }: Props) => {
  const posts: Array<Post> = JSON.parse(poststring); //avoid Only plain objects can be passed to Client Components from Server Components
  const { searchValue } = useContext(SearchContext);
  const [categoryName, setCategoryName] = useState<string>("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(posts || null);
  const [countPage, setCountPage] = useState();
  const [arrayToFilter, setArrayToFilter] = useState<Array<Post>>(posts);

  const postsPerPage = 5;
  const [pageData, setPageData] = useState<Array<Post>>();

  const getCurrentPosts = (value: number): void => {
    let indexOfLastPost;
    if (value) {
      indexOfLastPost = value * postsPerPage;
    } else {
      indexOfLastPost = page * postsPerPage;
    }

    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts =
      posts && posts.slice(indexOfFirstPost, indexOfLastPost);
    setPageData(currentPosts);
  };

  const handleChange = (
    event: React.ChangeEvent<unknown> | null,
    value: number
  ) => {
    setPage(value);

    getCurrentPosts(value);
  };

  useEffect(() => {
    handleChange(null, page);
    getCurrentPosts(page);
  }, [page]);


  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 ">
        <div className="px-4">
            <div className="bg-neutral pt-4 pl-4">
                <Stack spacing={2}>
                  <Typography>Page: {page}</Typography>
                  <Pagination
                    count={10}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                  />
                </Stack>
            </div>
            {pageData && <HomeFilter posts={JSON.stringify(pageData)} categories={categories} />}
        </div>
      </div>

    </div>
  );
};

export default HomePagination;
