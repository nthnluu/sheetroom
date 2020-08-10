import Navbar from "../PageLayouts/AppLayout/Navbar";

const PageLayout  = ({session}) => {
    return(
        <div>
            <Navbar session={session}/>
        </div>
    )
}
export default PageLayout
