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
        const {data} = await axios.get(`${BASE_URL}/api/users`)
        
        set({allUsers: data})
    }
})

const useAuthStore = create(
    persist(authStore, {name: 'auth'})
)

export default useAuthStore