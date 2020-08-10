const ResultPage = () => {
    return (<div className="mt-1">
        <h1 className="text-2xl font-bold text-gray-800">Results</h1>
        <div className="flex flex-col mt-3">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div
                    className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Score
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Submitted at
                            </th>
                            <th className="px-6 py-3 bg-gray-50"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*// <!-- Odd row -->*/}
                        <tr className="bg-white">
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                Jane Cooper
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                78/100 (78%)
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                Mon Jan 17, 2020 8:34 PM
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                            </td>
                        </tr>

                        {/*// <!-- Even row -->*/}
                        <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                Cody Fisher
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                94/100 (94%)
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                Mon Jan 17, 2020 8:34 PM
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                            </td>
                        </tr>

                        {/*// <!-- More rows... -->*/}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>)
}

export default ResultPage
