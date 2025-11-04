import configPromise from '@payload-config'
import { getPayload } from 'payload'

// GET /my-route
export const GET = async (req: Request) => {
  const payload = await getPayload({ config: configPromise })
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit') ?? '60')

  // Payloadコレクション "comments" から取得
  const comments = await payload.find({
    collection: 'comments',
    where: { status: { equals: 'published' } },
    limit,
    sort: '-createdAt',
  })

  return Response.json(comments.docs)
}

// POST /my-route
export const POST = async (req: Request) => {
  const payload = await getPayload({ config: configPromise })
  const body = await req.json()

  const doc = await payload.create({
    collection: 'comments',
    data: {
      accountId: body.accountId,
      comment: body.comment,
      profileNumber: body.profileNumber ?? 1,
      age: body.age ?? null,
      gender: body.gender ?? 'unspecified',
      occupation: body.occupation ?? null,
      district: body.district ?? null,
      status: 'draft',
    },
  })

  return Response.json({ ok: true, id: doc.id })
}
