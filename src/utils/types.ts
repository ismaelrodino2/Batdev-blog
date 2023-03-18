export type Post = {
  id: string;
  postPic: string;
  postPicKey: string;
  title: string;
  content: string;
  allowComments: boolean;
  createdAt: Date | string;
  authorId: string;
  categories: Array<Categories>;
  author: author;
};
type author = {
  avatarKey: string;
  avatarUrl: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  updatedAt: string;
};
export type PostNoCat = {
  id: string;
  title: string;
  content: string;
  allowComments: boolean;
  createdAt: Date;
  authorId: string;
  postPic: string;
  postPicKey: string;
  categories: Array<Category>;
};

export type Categories = {
  assignedAt: string;
  assignedBy: string;
  category: Category;
  categoryId: string;
  postId: string;
};

export type Category = {
  id: string;
  name: string;
};

export interface Database {
  public: {
    Tables: {
      Posts: {
        Row: {
          title: string;
          content: string;
          allowComments: boolean;
          authorId: string;
          postPic: string;
          id: string;
          createdAt: string;
        }; // The data expected to be returned from a "select" statement.
        Insert: {
          title: string;
          content: string;
          allowComments: boolean;
          authorId: string;
        }; // The data expected passed to an "insert" statement.
        Update: {
          title?: string;
          content?: string;
          allowComments?: boolean;
          authorId?: string;
        }; // The data expected passed to an "update" statement.
      };
      Users: {
        id: string;
        avatarUrl: string;
        avatarKey: string;
        email: string;
        name: string;
        updatedAt: Date;
        createdAt: Date;
      };
      Categories: {
        id: string;
        name: string;
      };
      CategoriesOnPosts: {
        postId: string; // relation scalar field (used in the `@relation` attribute above)
        categoryId: string; // relation scalar field (used in the `@relation` attribute above)
        assignedAt: Date;
        assignedBy: string;
      };
    };
  };
}

export type User = {
  id: string;
  avatarUrl?: string | null;
  avatarKey?: string | null;
  email: string;
  name: string;
  updateAt?: string;
  createdAt?: string;
};

export type Comments = {
  id: number;
  content: string;
  postId: string;
  authorId: string;
  createdAt: Date;
  author: {
    id: string;
    avatarUrl?: string | null;
    avatarKey?: string | null;
    email: string;
    name: string;
    updatedAt: Date;
    createdAt: Date;
  };
};

export type CatArr = Array<{
  assignedBy: string;
  assignedAt: Date;
  category: { connect: { id: string } };
}>;
