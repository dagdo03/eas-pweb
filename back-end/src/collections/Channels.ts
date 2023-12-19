import { CollectionConfig } from 'payload/types'
import { AuthenticatedUser } from '../access/AuthenticatedUser'
import Users from './Users'

const Channels: CollectionConfig = {
  slug: 'channels',
  admin: {
    useAsTitle: 'channel'
  },
  access: {
    create: () => true,
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
      name: 'receiver',
      type: 'relationship',
      relationTo: 'receivers',
      required: true
      
    },
    {
        name: 'channel',
        type: 'text',
        required: true,
        
    },
    // {
    //   name: 'message',
    //   type: 'relationship',
    //   relationTo: 'users',
    //   hasMany: true
      
    // }
  ],
  endpoints: [
    {
      path: "/chats/:id",
      method: "get",
      handler:async (req, res, next) => {
        const {id} = req.params
        const chats = await req.payload.find({
          collection: "chats",
          where: {
            channel: {
              equals: id
            }
          }
        })
        if (chats){
          res.status(200).json(chats)
        }
        else {
          res.status(404).json({
            message: "chats not found"
          })
        }
      }
    }
  ]
}

export default Channels
