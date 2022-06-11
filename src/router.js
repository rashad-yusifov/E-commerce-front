import Home from './components/pages/Home';
import MovieControl from './components/pages/MovieControl';

export const routers = [
    {
        path: '/',
        page: <Home/>
    },
    {
        path: '/control-movie/:id',
        page: <MovieControl/>
    },
    {
        path: '/control-movie',
        page: <MovieControl/>
    },
];