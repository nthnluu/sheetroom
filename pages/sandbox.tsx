import {GetServerSideProps} from "next";
import CheckForUser from "../lib/CheckForUser";
import Desmos from "../components/AssignmentEditor/Blocks/DesmosGraph/Desmos";

const Sandbox = ({session, profileData}) => {
    return <>
        <Desmos/>
    </>
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res, true)
};

export default Sandbox
