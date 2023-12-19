import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import Chats from './collections/Chats'
import Channels from './collections/Channels'
import Receivers from './collections/Receivers'
import PrivateChats from './collections/PrivateChats'


export default buildConfig({
  serverURL: process.env.PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  cors: ['http://localhost:5173'],
  csrf: ['http://localhost:5173'],
  editor: slateEditor({}),
  collections: [Users, Chats, Channels, Receivers, PrivateChats],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
