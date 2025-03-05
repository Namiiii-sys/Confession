'use server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const db = [
    {
        content:"Hi namita and ria",
        date: "19 Feb 2025"
    }
]


export async function getPosts() {
    const posts = prisma.confessions.findMany()
    return posts 
}

export async function createPosts(content) {
    const date = new Data().toDateString()
    
    return await prisma.confessions.create({
        data:{
            content:content,
            date: date
        }
    })
}