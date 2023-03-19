import prisma from '../../utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function categories(req: NextApiRequest, res: NextApiResponse){
    try{
        const categories = await prisma.category.findMany()
        res.status(200).json(categories)

}catch(err){
    console.log(err)
    res.status(500).json(err)
}finally {
    await prisma.$disconnect();
  }

}