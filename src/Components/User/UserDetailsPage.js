import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { UserDetails } from "../../Components/User/UserDetails";

export const UserDetailsPage = () => {

    const { userId } = useParams();

    return (
        <>
            <UserDetails userId={userId} />
        </>
    )
}