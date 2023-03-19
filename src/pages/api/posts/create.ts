import prisma from '@/utils/prisma'
import { CatArr, Category, User } from '@/utils/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function createPost(req: NextApiRequest, res: NextApiResponse){
type DataType = {
  id:string
    title: string
    content: string
    allowComments: boolean
    postPic: string
    postPicKey: string
    user:string
    categories: Array<Category>
  }

  
  const data:DataType = req.body
    let catArr:CatArr=[]

 data?.categories?.forEach((el:Category)=>{
  catArr.push({
    assignedBy: data.user,
    assignedAt: new Date(),
    category: {
      connect: {
        id: el.id,
      },
    },
  })
})

    try{
        const post = await prisma.post.create({data: {title:data.title, content: data.content, postPic:data.postPic, postPicKey:data.postPicKey, allowComments: data.allowComments, authorId:data.id, categories:{
            create:catArr
          }
        }})
        res.status(200).json(post)

}catch(err){
    console.log(err)
    res.status(500).json(err)
}finally {
  await prisma.$disconnect();
}

}
