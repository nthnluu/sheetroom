import React from "react";

const Tabs = ({setActiveTab, activeTab, tabs}) => {
    return (<div>
            {/*// <!-- Tabs at small breakpoint and up -->*/}
            <div className="block">
                <nav className="-mb-px flex justify-between space-x-8">
                    {tabs.map((tab, index) => <button key={index} onClick={() => setActiveTab(index)}
                                                      className={activeTab === index ? "whitespace-no-wrap pb-3 w-full px-1 border-b-2 border-blue-500 font-medium text-sm leading-5 text-blue-600 focus:outline-none focus:text-blue-800 focus:border-blue-700" : "whitespace-no-wrap w-full pb-3 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"}>
                        {tab}
                    </button>)}
                </nav>
            </div>
        </div>

    )
}

export default Tabs
