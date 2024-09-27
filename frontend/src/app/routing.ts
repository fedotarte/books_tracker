import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';

export const routes = [
    { path: '/', route: [HomePage.route, NotFound.backToHomeRoute] },
    { path: '/books', route: [PostsList.route, HomePage.goToPostsRoute] },
    { path: '/authors', route: [PostsList.route, HomePage.goToPostsRoute] },
    { path: '/posts/:slug', route: [PostsSingle.route, PostsList.goToPostRoute] },
    { path: '/404', route: NotFound.route },
];
export const history = createBrowserHistory();

export const router = createHistoryRouter({
    routes,
    notFoundRoute: NotFound.route,
});

router.setHistory(history);