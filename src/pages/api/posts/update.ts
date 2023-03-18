import { CatArr, Category, User } from "@/utils/types";
import { PrismaClient } from "@prisma/client";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../utils/prisma";

export default async function createPost(req: NextApiRequest, res: NextApiResponse){
try{
  type DataType = {
    id: string
    title: string
    content: string
    allowComments: boolean
    postPic: string
    user:User
    authorId:string
    postId:string
    categories: Array<Category>

  }


    const {postId, title, content, allowComments}:DataType = req.body
    const data:DataType = req.body

    let catArr:CatArr=[]
 data?.categories?.forEach((el:Category)=>{
  catArr.push({
    assignedBy: data.user.name,
    assignedAt: new Date(),
    category: {
      connect: {
        id: el.id,
      },
    },
  })
})


    if(data.authorId === data.id){

      
await prisma.categoriesOnPosts.deleteMany({
  where:{
    postId
  }
})

      const updatedPost = await prisma.post.update({
            where: {id:postId},
            data: {title, content, allowComments,
              categories:{
                create:catArr
              }
        }
      })



        res.status(200).json({updatedPost})
    
      } else{
        res.status(511).json({message:'Authentication is required'})
      }


}catch(err){
    console.log(err)
    res.status(500).json({message: 'Oops some error occurred.', err})}finally {
      await prisma.$disconnect();
      res.end()
    }

}

