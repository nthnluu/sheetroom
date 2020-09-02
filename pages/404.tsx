import Navbar from "../components/PageLayouts/AppLayout/Navbar";

export default function Custom404() {
    return <>
        <Navbar logoOnly/>
        <div className="h-screen flex items-center justify-between">
        <div className="mx-auto -mt-48 px-4">
            <img alt="" className="mx-auto" style={{maxHeight: '46rem'}} src={`/404pics/404${Math.floor(Math.random() * 6 + 1)}.svg`}/>
            <h1 className="text-center font-bold text-3xl sm:-mt-24 text-gray-800">The page you're looking for doesn't exist.</h1>
        </div>

    </div></>
}
