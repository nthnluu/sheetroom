import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useQuery} from "urql";
import {getActivityObjects} from "../../lib/graphql/Notifications";


const LoadingPlaceholder: React.FC = () => {
    return (
        <div className="py-12">
            <div className="mx-auto">
                <div className="mx-auto w-full text-center"><CircularProgress size={30} color="secondary"/></div>
            </div>

        </div>
    )
};

const ActivityFeed: React.FC<{session}> = ({session}) => {

    const [result] = useQuery({
        query: getActivityObjects,
        variables: {
            // @ts-ignore
            userId: session.id
        }
    });

    const {fetching, data, error} = result


    return (<div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
        <div className="pl-6 lg:w-80">
            <div className="pt-6 pb-2">
                <h2 className="text-sm leading-5 font-semibold">Activity</h2>
            </div>
            <div>
                <ul className="divide-y divide-gray-200">
                {fetching ? <LoadingPlaceholder/> : data.notifications_activity_object.map(notification => <li className="py-4" key={notification.id}>
                    <div className="flex space-x-3">
                        <img className="h-6 w-6 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80" alt="" />
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium leading-5">{notification.target_user === session.id ? "You" : "Someone"}</h3>
                                <p className="text-sm leading-5 text-gray-500">1h</p>
                            </div>
                            <p className="text-sm leading-5 text-gray-500">{notification.content}</p>
                        </div>
                    </div>
                </li>) }
                </ul>
                <div className="py-4 text-sm leading-5 border-t border-gray-200">
                    <a href="#" className="text-blue-600 font-semibold hover:text-blue-900">View all activity →</a>
                </div>
            </div>
        </div>
    </div>)
}

export default ActivityFeed
