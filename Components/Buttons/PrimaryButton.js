export default function ({size, color, text}) {
    switch(size) {
        case('xs'):
            return (
                <button type="button"
                        className={"inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-" + color + "-600 hover:bg-" + color + "-500 focus:outline-none focus:border-" + color + "-700 focus:shadow-outline-" + color + " active:bg-" + color + "-700 transition ease-in-out duration-150"}>
                {text}
            </button>);
            break;
        case('sm'):
            return (<button type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                {text}
            </button>);
            break;
        case('md'):
            return (<button type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                {text}
            </button>);
            break;
        case('lg'):
            return (<button type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                {text}
            </button>);
            break;
        case('xl'):
            return (<button type="button"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                {text}
            </button>);
            break;
        default:
            return (<button type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                {text}
            </button>);
            break;

    }

}
