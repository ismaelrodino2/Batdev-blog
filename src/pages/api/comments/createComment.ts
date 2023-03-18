import prisma from '@/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function createComment(req: NextApiRequest, res: NextApiResponse){
  const data = req.body
try{
    

  const newComment = await prisma.comment.create({data: {content:data.text, postId: data.postId , authorId:data.userId
}})

res.status(200).json(newComment)


}catch(err){
    console.log(err)
    res.status(500).json({message: 'Oops some error occurred.', err})
}finally {
  await prisma.$disconnect();
}

}