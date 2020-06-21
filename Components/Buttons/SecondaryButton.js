export default function ({size, color, text}) {
    switch(size) {
        case('xs'):
            return (
                <button type="button"
                        className={"inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-" + color + "-700 bg-" + color + "-100 hover:bg-" + color + "-50 focus:outline-none focus:border-" + color + "-300 focus:shadow-outline-" + color + " active:bg-" + color + "-200 transition ease-in-out duration-150"}>
                    {text}
                </button>);
            break;
        case('sm'):
            return (<button type="button"
                            className={"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-" + color + "-700 bg-" + color + "-100 hover:bg-" + color + "-50 focus:outline-none focus:border-" + color + "-300 focus:shadow-outline-" + color + " active:bg-" + color + "-200 transition ease-in-out duration-150"}>
                {text}
            </button>);
            break;
        case('md'):
            return (<button type="button"
                            className={"inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-" + color + "-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-" + color + "-300 focus:shadow-outline-" + color + " active:bg-" + color + "-200 transition ease-in-out duration-150"}>
                {text}
            </button>);
            break;
        case('lg'):
            return (<button type="button"
                            className={"inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-" + color + "-700 bg-" + color + "-100 hover:bg-" + color + "-50 focus:outline-none focus:border-" + color + "-300 focus:shadow-outline-" + color + " active:bg-" + color + "-200 transition ease-in-out duration-150"}>
                {text}
            </button>);
            break;
        case('xl'):
            return (<button type="button"
                            className={"inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-" + color + "-700 bg-" + color + "-100 hover:bg-" + color + "-50 focus:outline-none focus:border-" + color + "-300 focus:shadow-outline-" + color + " active:bg-" + color + "-200 transition ease-in-out duration-150"}>
                {text}
            </button>);
            break;
        default:
            return (<button type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150">
                INVALID BUTTON
            </button>);
            break;

    }

}
