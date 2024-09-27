import React from 'react';
import { Link } from 'atomic-router-react';
import { createRoute } from 'atomic-router';

const route = createRoute();
const goToPostsRoute = createRoute()

const Page = () => {
    return (
        <div>
            <h1>This is books page</h1>
    <Link to={goToPostsRoute}>Go to posts</Link>
    <br />
    <br />
    <Link to="/asdfasdf">Non-existing page</Link>
    </div>
);
};

export const BooksPage = {
    route,
    goToPostsRoute,
    Page,
};
