import prisma from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getComments(req: NextApiRequest, res: NextApiResponse){

  const {pid} = req.query
  if(typeof pid !== 'string') return
  try{
    

    const comments = await prisma.comment.findMany({
        where: {
          postId: pid,
        },
        include: {
          author: true,
        },
      });
      res.status(200).json(comments)


}catch(err){
    console.log(err)
    res.status(500).json({message: 'Oops some error occurred.', err})
}finally {
  await prisma.$disconnect();
}

}