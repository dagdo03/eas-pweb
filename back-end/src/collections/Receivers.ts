import { CollectionConfig } from 'payload/types'

const Receivers: CollectionConfig = {
  slug: 'receivers',
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
    },
    {
      name: 'sender',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      required: true
    }
  ],
}

export default Receivers
