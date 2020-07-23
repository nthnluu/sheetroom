import React, {useState} from "react";
import PropTypes from "prop-types";

const JsonDebugBox = ({content}) => {
    const [isLocked, toggleLock] = useState(false);
    // checks if the build is production, component wont render if it is
    if (process.env.NODE_ENV === 'development') {
        return (<div className="my-6">
            <div className="flex justify-between">
                <h3 className="font-semibold text-gray-800 mb-2">JSON Inspector</h3>
                <span className="text-red-500"><i className="fas fa-exclamation-circle mr-1"/>Remove this component and its import before committing changes!</span>
            </div>
            <div className="rounded-lg p-4 shadow-sm" style={{color: '#61eaff', backgroundColor: '#00161a'}} key={JSON.stringify(content ? content.length : '420-69') + JSON.stringify(Date.now())}>
                {content ? <div style={{maxHeight: '32rem'}} className="w-full resize-y text-sm font-semibold overflow-scroll whitespace-pre-wrap focus:outline-none bg-transparent font-mono leading-tight inline-block">{JSON.stringify(content, null, 2)} </div> : <div className="flex justify-center item-center p-6">
                    <h4><i className="fas fa-exclamation-circle mr-2"/>Invalid object</h4>
                </div>}
                <div className="space-x-2 mt-2 pt-2" style={{borderTop: '1px solid #1c5e69'}}>
                    <button type="button" onClick={() => console.log(content)}
                            className="inline-flex items-center px-2.5 py-1.5 text-xs leading-4 font-medium rounded bg-transparent focus:outline-none transition ease-in-out duration-150" style={{border: '1px solid #61eaff'}}>
                        <i className="fas fa-terminal mr-1"/>Console
                    </button>
                    <button type="button" onClick={() => alert(JSON.stringify(content))}
                            className="inline-flex items-center px-2.5 py-1.5 text-xs leading-4 font-medium rounded bg-transparent focus:outline-none transition ease-in-out duration-150" style={{border: '1px solid #61eaff'}}>
                        <i className="far fa-window-restore mr-1"/>Alert
                    </button>
                    <button type="button" onClick={() => toggleLock(!isLocked)}
                            className="inline-flex items-center px-2.5 py-1.5 text-xs leading-4 font-medium rounded bg-transparent focus:outline-none transition ease-in-out duration-150" style={{border: '1px solid #61eaff'}}>
                        {isLocked ? <span><i className="fas fa-lock-open mr-1"/> Unlock</span> : <span><i className="fas fa-lock mr-1"/> Lock</span>}
                    </button>
                </div>
            </div>
        </div>)
    } else {
        return null;
    }
};

export default JsonDebugBox
