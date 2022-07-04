import { Link } from "react-router-dom";

export const GuestNavigation = () => {

    return (
        <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
        </>
    )
}
