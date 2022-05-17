import {createRouter, createWebHistory} from 'vue-router';
import TvDetails from '../components/TvDetails';
import TvShows from '../components/TvShows';

const routes = [
    {
        path:'/',
        name:'TvShows',
        component: TvShows
    },
    {
        path:'/shows/:id',
        name:'TvDetails',
        component: TvDetails
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;