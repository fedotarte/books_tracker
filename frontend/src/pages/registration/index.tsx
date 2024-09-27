import {createRoute} from "atomic-router";
import {Link} from "atomic-router-react";


const route = createRoute()
const goToRegistrationRoute = createRoute()

const Page = () => {
    return (
        <div>
            <h1>This is Registration Route</h1>
            <Link to={goToRegistrationRoute}>Go to authors</Link>
        </div>
    )
}

export const RegistrationPage = {
    route,
    goToRegistrationRoute,
    Page,
}