import prisma from '@/utils/prisma'
import { Category, User } from '@/utils/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function deletePost(req: NextApiRequest, res: NextApiResponse){
type DataType = {
  id:string
  authorId:string
  userId:string
  
}

const data:DataType=req.body
  
if(data.authorId === data.userId){

    try{
      await prisma.categoriesOnPosts.deleteMany({
        where:{
          postId:data.id
        }
      })

        const post = await prisma.post.delete({
            where:{
                id:data.id
            }
        })
        res.status(200).json(post)

}catch(err){
    console.log(err)
    res.status(500).json(err)
}finally {
  await prisma.$disconnect();
}
}else{
  res.status(500).json("Not authenticated")

}
}





