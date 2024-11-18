import { createRouter, createWebHistory } from 'vue-router'
import Assets from './Assets'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...Assets,
    ],
})

export default router
