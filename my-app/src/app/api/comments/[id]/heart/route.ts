import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  try {
    // 1. Get current comment
    const comment = await payload.findByID({
      collection: 'comments',
      id,
    })

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    // 2. Increment hearts
    const currentHearts = comment.hearts || 0
    const updatedComment = await payload.update({
      collection: 'comments',
      id,
      data: {
        hearts: currentHearts + 1,
      },
    })

    return NextResponse.json({ hearts: updatedComment.hearts })
  } catch (error) {
    console.error('Error incrementing hearts:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
