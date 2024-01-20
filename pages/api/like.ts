import { client } from "@/utils/client";
import type { NextApiRequest, NextApiResponse } from "next";
import {uuid} from 'uuidv4'


const handler = async (req:NextApiRequest, res:NextApiResponse ) => {
    if (req.method === 'PUT') {
        const {userId, postId, like} = req.body

        const data = like 
        ? await client.patch(postId)
        .setIfMissing({likes: []})
        .insert('after', 'likes[-1]', [
            {
                _key: uuid(),
                _ref: userId
            }
        ])
        .commit()
        : await client.patch(postId)
        .unset([`likes[_ref=="${userId}"]`])
        .commit()

        res.status(200).json(data)
    }
}

export default  handler