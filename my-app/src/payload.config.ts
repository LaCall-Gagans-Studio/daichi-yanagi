// payload.config.ts
import { s3Storage } from '@payloadcms/storage-s3'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Comments } from './collections/Comments'
import { News } from './collections/News'
import { Events } from './collections/Events'
import { Policies } from './collections/Policies'
import { Candidates } from './collections/Candidates'
import { SocialLinks } from './collections/SocialLinks'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const bucket = process.env.R2_BUCKET
const endpoint = process.env.R2_PUBLIC_URL
const accessKeyId = process.env.R2_ACCESS_KEY_ID
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY

if (!bucket || !endpoint || !accessKeyId || !secretAccessKey) {
  throw new Error('R2 storage env vars are missing')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: ['https:/daichi-yanagi.com/', 'https://localhost:3000/'],
  collections: [Users, Media, Comments, News, Events, Policies, Candidates, SocialLinks],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      disableLocalStorage: true, // ← ローカルでも必ず R2 を使う
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        // forcePathStyle: true, // 必要なら
      },
    }),
  ],
})
