import {useRouter} from 'next/router'

export function MobileMenuProfile() {
    return (
        <div className="flex items-center px-5 sm:px-6">
            <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full"
                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                     alt=""/>
            </div>
            <div className="ml-3">
                <div className="text-base font-medium leading-6 text-gray-800">Tom Cook
                </div>
                <div className="text-sm font-medium leading-5 text-gray-500">tom@example.com
                </div>
            </div>
        </div>
    )

}

export function MobileMenuActionButtons({item, actionButtons}) {
    const router = useRouter();
    return (<div className="px-2 sm:px-3">
        {actionButtons.secondary.label ? <button onClick={()=> router.push(actionButtons.secondary.href)}
            className="mt-1 w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-400 transition duration-150 ease-in-out">{actionButtons.secondary.label}
        </button> : null}
        <button onClick={()=> router.push(actionButtons.primary.href)}
            className="mt-1 w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-400 transition duration-150 ease-in-out">{actionButtons.primary.label}
        </button>
    </div>)

}

export function MobileMenu({items, actionButtons}) {
    return (<div className="block md:hidden border-b border-gray-300">
        <div className="px-2 pt-2 pb-3 sm:px-3">
            {items.map((item, i) => <a href="#" key={i}
                                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-400 transition duration-150 ease-in-out">{item.icon ?
                <i
                    className={item.icon + ' mr-2'}/> : null}{item.label}
            </a>)}
        </div>
        <div className="py-3 border-t border-gray-300">
            {/*<MobileMenuProfile/>*/}
            <MobileMenuActionButtons actionButtons={actionButtons}/>
        </div>
    </div>)
}

export function MenuButton({open, onClick, exam}) {
    return (
        <>
            <button
                className="inline-flex text-gray-800 items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 transition duration-150 ease-in-out"
                aria-label="Main menu" aria-expanded={open} onClick={() => onClick()}>
                {open ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6L18 18" stroke="#4A5568" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg> : <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"/>
                </svg>}
            </button>
        </>)
}
