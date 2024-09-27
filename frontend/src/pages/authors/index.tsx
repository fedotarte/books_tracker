import {createRoute} from "atomic-router";
import {Link} from "atomic-router-react";


const route = createRoute()
const goToAuthorsRoute = createRoute()

const Page = () => {
    return (
        <div>
            <h1>This is Authors Route</h1>
            <Link to={goToAuthorsRoute}>Go to authors</Link>
        </div>
    )
}

export const AuthorsPage = {
    route,
    goToAuthorsRoute,
    Page,
}