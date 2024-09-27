import {createRoute} from "atomic-router";
import {Link} from "atomic-router-react";


const route = createRoute()
const backToBooksRoute = createRoute()

const Page = () => {
    return (
        <div>
            <h1>Not found</h1>
            <Link to={backToBooksRoute}>Go to books</Link>
        </div>
    )
}

export const NotFoundPage = {
    route,
    backToBooksRoute,
    Page
}