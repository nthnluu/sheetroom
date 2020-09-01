import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import {GetServerSideProps} from "next";
import CheckForUser from "../lib/CheckForUser";

const Submissions = ({session, profileData}) => {
    return (<div>
        <Navbar session={session} profileData={profileData}/>
    </div>)
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res)
};

export default Submissions
