'use client'

import React, { useState } from 'react'
import { updatePost, deletePost } from '@/server/action'

function Card({ cid, content: initialContent, date }) {
  const [content, setContent] = useState(initialContent)
  const [isEditing, setIsEditing] = useState(false)
  const [draftContent, setDraftContent] = useState(initialContent)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  if (isDeleted) {
    return null
  }

  async function handleSaveEdit() {
    if (!draftContent || draftContent.trim().length < 10) {
      alert('Too short')
      return
    }

    try {
      setIsSaving(true)
      const res = await updatePost(cid, draftContent.trim())
      if (res && res.success === false) {
        alert(res.error || 'Failed to save changes')
        setIsSaving(false)
        return
      }
      setContent(draftContent.trim())
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update confession:', error)
      alert('Failed to save changes')
    } finally {
      setIsSaving(false)
    }
  }

  function handleCancelEdit() {
    setDraftContent(content)
    setIsEditing(false)
  }

  async function handleDelete() {
    if (!cid) {
      alert('Missing confession ID')
      return
    }

    try {
      setIsDeleting(true)
      const res = await deletePost(cid)
      if (res && res.success === false) {
        alert(res.error || 'Failed to delete confession')
        setIsDeleting(false)
        setShowConfirmDelete(false)
        return
      }
      setIsDeleted(true)
    } catch (error) {
      console.error('Failed to delete confession:', error)
      alert('Failed to delete confession')
      setIsDeleting(false)
      setShowConfirmDelete(false)
    }
  }

  return (
    <div className="w-full border bg-black/40 rounded-md p-6 sm:p-8 flex flex-col gap-6 sm:gap-8">
      {isEditing ? (
        <div className="flex flex-col gap-4">
          <textarea
            value={draftContent}
            maxLength={2000}
            onChange={(e) => setDraftContent(e.target.value)}
            className="w-full bg-transparent border-2 border-white text-white outline-none px-2 py-4 rounded-md text-base resize-y min-h-[100px]"
            placeholder="Type your confession..."
          />
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={isSaving}
              className="px-4 py-1.5 border border-zinc-400 rounded-md text-sm text-zinc-300 hover:bg-zinc-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveEdit}
              disabled={isSaving}
              className="px-4 py-1.5 border-2 border-white rounded-md text-sm font-semibold text-white hover:bg-white hover:text-black transition cursor-pointer disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-lg break-words whitespace-pre-wrap text-white">
            {content}
          </p>

          {showConfirmDelete ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
              <span className="text-sm text-red-300">
                Are you sure you want to delete this confession?
              </span>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setShowConfirmDelete(false)}
                  disabled={isDeleting}
                  className="px-3 py-1 text-xs border border-zinc-400 rounded text-zinc-300 hover:bg-zinc-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-3 py-1 text-xs border border-red-400 bg-red-600/30 rounded text-red-200 hover:bg-red-600 hover:text-white transition cursor-pointer disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-white text-sm sm:text-base">
                Posted on {date}
              </p>

              {cid && (
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="border border-white/60 px-3 py-1 rounded text-xs sm:text-sm text-white hover:bg-white hover:text-black transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirmDelete(true)}
                    className="border border-red-400/60 px-3 py-1 rounded text-xs sm:text-sm text-red-300 hover:bg-red-500 hover:text-white transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Card
