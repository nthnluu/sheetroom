import {useRouter} from "next/router";
import JsonDebugBox from "../components/JsonDebugBox";

const Callback = () => {
    const router = useRouter();
    const {state, code} = router.query;

    localStorage.removeItem('gClassCode');

    localStorage.setItem('gClassCode', code)
    const gClass = localStorage.getItem('gClassCode');
    return <JsonDebugBox content={gClass}/>

}

export default Callback
