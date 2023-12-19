import { CollectionConfig } from 'payload/types'
import { AuthenticatedUser } from '../access/AuthenticatedUser'

const Chats: CollectionConfig = {
  slug: 'chats',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: AuthenticatedUser,
    read: () => true
  },  
  fields: [
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true
    },
    {
        name: 'message',
        type: 'textarea',
        required: false
    },
    {
      name: 'receiver',
      type: 'relationship',
      relationTo: 'users',
      required: true
    }
  ],

  
}

export default Chats
