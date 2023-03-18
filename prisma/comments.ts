import prisma from "@/utils/prisma";

export async function getComments(id: string){
    return await prisma.comment.findMany({
        where: {
          postId: id,
        },
        include: {
          author: true,
        },
      });
   
}

