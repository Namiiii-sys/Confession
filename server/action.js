'use server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function getPosts() {
    const posts = await prisma.confessions.findMany()
    return posts 
}

export async function createPost(content) {
    const date = new Date().toDateString()
    
    return await prisma.confessions.create({
        data: {
            content: content,
            date: date
        }
    })
}
