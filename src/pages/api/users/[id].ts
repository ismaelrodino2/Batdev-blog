import { PrismaClient } from "@prisma/client";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../utils/prisma";


export default async function getUsers(req: NextApiRequest, res: NextApiResponse){

const id:any = req.query.id


  try{
    

    const user = await prisma.user.findFirst({where:{
        id
    }})
    res.status(200).json({user})

}catch(err){
    console.log(err)
    res.status(500).json(err)
}finally {
    await prisma.$disconnect();
  }


}