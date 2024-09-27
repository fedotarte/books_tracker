import {createRoute} from "atomic-router";
import {Link} from "atomic-router-react";


const route = createRoute()
const goToLoginRoute = createRoute()

const Page = () => {
    return (
        <div>
            <h1>This is Login Route</h1>
            <Link to={goToLoginRoute}>Go to authors</Link>
        </div>
    )
}

export const LoginPage = {
    route,
    goToLoginRoute,
    Page,
}