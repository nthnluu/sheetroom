import moment from "moment";


const EntryRow = ({entry}) => {
    const [key, value] = Object.entries(entry)[0]
    switch (key) {
        case('user_in_tab'):
            return (<li className="py-2 text-gray-500 flex justify-between items-center">
                <h2 className="font-medium uppercase text-xs sm:text-sm">
                    <svg className="h-4 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                    </svg>
                    User entered tab
                </h2>
                <span className="flex-shrink-0">{moment(value).format('h:mm a')}</span>
            </li>)
        case('user_exit_tab'):
            return (<li className="py-2 text-red-500 flex justify-between items-center">
                <h2 className="font-medium uppercase  text-xs sm:text-sm inline-flex items-start">
                    <svg className="h-4 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                    </svg>
                    User left tab
                </h2>
                <span className="flex-shrink-0">{moment(value).format('h:mm a')}</span>
            </li>)
        case('user_pasted_text'):
            return (<li className="py-2 text-red-500 flex justify-between items-center">
                <h2 className="font-medium uppercase  text-xs sm:text-sm inline-flex items-start">
                    <svg className="h-4 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    <span className="inline-block">
                    <div>User pasted text</div>
                        {/*//@ts-ignore*/}
                        <div className="text-xs text-gray-500 normal-case truncate">"{value.content}"</div>
                    </span>
                </h2>
                {/*//@ts-ignore*/}
                <span className="flex-shrink-0">{moment(value.time).format('h:mm a')}</span>
            </li>)
        default:
            return (<li className="py-2 text-gray-500 flex justify-between items-center">
                <h2 className="font-medium uppercase text-xs sm:text-sm">{key}</h2>
                <span className="flex-shrink-0">{moment(value).format('h:mm a')}</span>
            </li>)

    }
}
const AnalyticsCard = ({eventLog}) => {

    const eventLogMap = eventLog.reverse()
    return <div className="border border-gray-200 rounded-lg shadow-sm mt-4 p-6 text-gray-800">
        <div className="flex justify-between items-center">
            <h1 className="text-base sm:text-lg font-semibold">Activity Log</h1>
            <h2 className="inline-flex items-center opacity-50 text-xs sm:text-sm"><svg xmlns="http://www.w3.org/2000/svg" className="inline-flex items-center h-4 sm:h-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg> Only you can see this</h2>
        </div>
        {eventLogMap.length > 0 ? <ul className="divide-y divide-gray-200 mt-4">
            {eventLogMap.map((entry, index) => <EntryRow key={index} entry={entry}/>)}
        </ul> : <h3 className="text-center">No events to display</h3>}

    </div>
}


export default AnalyticsCard
