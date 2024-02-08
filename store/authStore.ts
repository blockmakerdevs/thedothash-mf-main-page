import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import axios from 'axios'
import { User } from '@/types'
import { BASE_URL } from '@/utils'

const authStore = (set:any) => ({
    user: null,
    allUsers: [],

    addUser: (user: User) => set({user: user}),
    removeUser: () => set({user: null}),

    fetchAllUsers: async() => {
       try {
        const {data} = await axios.get(`${BASE_URL}/api/users`)
        
        set({allUsers: data})
       } catch (error) {
        console.log(error)
       }
    }
})

const useAuthStore = create(
    persist(authStore, {name: 'auth'})
)

export default useAuthStore