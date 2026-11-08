'use server'
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const globalForPrisma = globalThis

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    })
globalForPrisma.prisma = prisma

const MAX_CONTENT_LENGTH = 2000

export async function getPosts() {
    try {
        const posts = await prisma.confessions.findMany()
        return posts
    } catch (error) {
        console.error("Error fetching confessions from database:", error)
        return []
    }
}

export async function createPost(content) {
    if (!content || !content.trim()) {
        throw new Error("Confession content cannot be empty")
    }

    const trimmed = content.trim()
    if (trimmed.length > MAX_CONTENT_LENGTH) {
        throw new Error(`Confession exceeds maximum allowed length of ${MAX_CONTENT_LENGTH} characters`)
    }

    const date = new Date().toDateString()

    const post = await prisma.confessions.create({
        data: {
            content: trimmed,
            date: date
        }
    })
    revalidatePath('/')
    return post
}

export async function updatePost(cid, content) {
    if (!cid) {
        return { success: false, error: "Confession ID is required" }
    }
    if (!content || !content.trim()) {
        return { success: false, error: "Confession content cannot be empty" }
    }

    const trimmed = content.trim()
    if (trimmed.length > MAX_CONTENT_LENGTH) {
        return { success: false, error: `Confession exceeds maximum allowed length of ${MAX_CONTENT_LENGTH} characters` }
    }

    try {
        const updated = await prisma.confessions.update({
            where: { cid },
            data: {
                content: trimmed
            }
        })
        revalidatePath('/')
        return { success: true, post: updated }
    } catch (error) {
        console.error("Error updating confession:", error)
        return { success: false, error: error.message || "Failed to update" }
    }
}

export async function deletePost(cid) {
    if (!cid) {
        return { success: false, error: "Confession ID is required" }
    }

    try {
        await prisma.confessions.deleteMany({
            where: { cid }
        })
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error("Error deleting confession:", error)
        return { success: false, error: error.message || "Failed to delete" }
    }
}
