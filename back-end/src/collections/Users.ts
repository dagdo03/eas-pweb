import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      unique: true, // Ensure email uniqueness
    },
    {
      name: 'name',
      type: 'text',
      required: true
    }
  ],
}

export default Users
