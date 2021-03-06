import {createRouter, createWebHistory} from 'vue-router';
import TvDetails from '../components/TvDetails';
import TvShows from '../components/TvShows';
import TvMaze from '../components/TvMaze';
import SliderV from '../components/SliderV';

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
    },
    {
        path:'/tvMaze',
        name:'TvMaze',
        component: TvMaze
    },
    {
        path:'/sliderV',
        name:'SliderV',
        component: SliderV
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;