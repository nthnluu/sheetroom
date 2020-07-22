import React from "react";

const JsonDebugBox = ({content}) => {
    // checks if the build is production, component wont render if it is
    if (process.env.NODE_ENV === 'development') {
        return (<div className="my-6">
            <div className="flex justify-between">
                <h3 className="font-semibold text-gray-800 mb-2">JSON Inspector</h3>
                <span className="text-red-500"><i className="fas fa-exclamation-circle mr-1"/>Remove this component before committing changes!</span>
            </div>
            {content ? <textarea style={{color: '#61eaff', backgroundColor: '#00161a'}} className="w-full text-sm font-semibold font-mono leading-tight shadow-sm inline-block p-4 border rounded-lg" spellCheck="false">{JSON.stringify(content, null, 2)}</textarea> : <div className="flex justify-center item-center p-6 border border-red-400 text-red-400 rounded-lg">
                <h4><i className="fas fa-exclamation-circle mr-2"/>Invalid object</h4>
            </div>}
            <div className="space-x-2">
                <button type="button" onClick={() => console.log(content)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                    <i className="fas fa-terminal mr-1"/>Console
                </button>
                <button type="button" onClick={() => alert(JSON.stringify(content))}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                    <i className="far fa-window-restore mr-1"/>Alert
                </button>
            </div>
        </div>)
    } else {
        return null;
    }
};

export default JsonDebugBox
