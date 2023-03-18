// posts.spec.ts

import Posts from "../../src/app/components/Posts";
import { Post } from "../../src/utils/types";

describe("Posts component", () => {
  it("displays the post's details correctly", () => {
    // Mock post data
    const post: Post = {
      id: "c269827c-5bcb-45fc-805f-fafc4b86af0c",
      postPic:
        "https://images.pexels.com/photos/11025228/pexels-photo-11025228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      postPicKey: "0.07041406897954339.jpg",
      title: "title",
      content: "<p>Example content</p>",
      allowComments: true,
      createdAt: "2023-03-06T01:21:26.477Z",
      authorId: "eb8cd210-64ba-42c9-a67b-6559844c872e",
      author: {
        id: "eb8cd210-64ba-42c9-a67b-6559844c872e",
        avatarUrl:
          "https://images.pexels.com/photos/11025228/pexels-photo-11025228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        avatarKey: "0.05082645655049367.jpeg",
        email: "ismael@email.com",
        name: "Ismael",
        updatedAt: "2023-02-21T19:20:09.491Z",
        createdAt: "2022-12-11T01:01:28.000Z",
      },
      categories: [
        {
          postId: "c269827c-5bcb-45fc-805f-fafc4b86af0c",
          categoryId: "2",
          assignedAt: "2023-03-08T01:55:49.481Z",
          assignedBy: "Ismael",
          category: {
            id: "2",
            name: "React",
          },
        },
        {
          postId: "c269827c-5bcb-45fc-805f-fafc4b86af0c",
          categoryId: "1",
          assignedAt: "2023-03-08T01:55:49.480Z",
          assignedBy: "Ismael",
          category: {
            id: "1",
            name: "JavaScript",
          },
        },
      ],
    };

    // Render the component with the mock post data
    cy.wrap({ post }).as("props");

    cy.mount(<Posts post={post} />);

    // Assert that the component displays the post's details correctly
    cy.contains(post.title);
    cy.contains(post.author.name);
    cy.contains(post.categories[0].category.name);
    cy.contains(post.categories[1].category.name);
    cy.contains("Example content");
    cy.get("img").should("have.attr", "src", post.postPic);
  });
});
