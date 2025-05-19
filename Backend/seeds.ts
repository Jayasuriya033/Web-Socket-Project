import express from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export default async function AdminAccount() {
try {
    const adminCount = await prisma.user.count({
        where: {
          roleId: 1,
        },
      });
    
    // const amdinCount = await prisma.role.create()
    if(!adminCount) {
        const hashPassword = await bcrypt.hash('adminpassword', 10)
        const user = await prisma.user.create(
            {data:{
                username : "jayasuriya",
                email: "gjayasuriya035@gmail.com",
                mobileNumber: "6384091750",
                password: hashPassword,
                roleId : 1
            }
        })
        console.log("Account  Created Successfully")
    } else {
        // console.log("Account already existed")
    }
} catch(err) {
    console.log("error", err)
}
}

