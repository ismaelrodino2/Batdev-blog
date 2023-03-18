import prisma from '@/utils/prisma'
import { Category, User } from '@/utils/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function aa(req: NextApiRequest, res: NextApiResponse){
type DataType = {
  id:any
  authorId:string
  userId:string
  
}

const data:DataType=req.body
  
if(data.authorId === data.userId){

    try{


        const post = await prisma.comment.delete({
            where:{
                id:data.id
            }
        })
        res.status(200).json('Success')

}catch(err){
    console.log(err)
    res.status(500).json(err)
}finally {
  await prisma.$disconnect();
}
}else{
  res.status(500).json("Not owner of the comment.")

}
}





