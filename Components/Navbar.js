import {useState} from "react";

function Links({items}) {
    return items.map(item => <a href="#"
                                className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-950 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 transition duration-150 ease-in-out"><i className={item.icon + 'ml-1'}/>{item.label}
    </a>);
}

function Logo({exam}) {
    return (<div className="flex-shrink-0 flex items-center">
        {/*Logo for small screens*/}
        {exam ? <img className="block lg:hidden h-10 w-auto" src="/hw_symbol.svg"
                     alt=""/> : <img className="block lg:hidden h-8 w-auto" src="/hw_logo.svg"
                                     alt="Homework"/>}
        {/*Logo for large screens*/}
        <img className="hidden lg:block h-8 w-auto" src="/hw_logo.svg"
             alt="Homework"/>
    </div>);
}

function MobileMenu({items}) {
    return (<div className="block md:hidden border-b border-gray-300">
        <div className="px-2 pt-2 pb-3 sm:px-3">
            {items.map(item => <a href="#"
                                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-400 transition duration-150 ease-in-out">{item.label}
            </a>)}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-300">
            <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full"
                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                         alt=""/>
                </div>
                <div className="ml-3">
                    <div className="text-base font-medium leading-6 text-white">Tom Cook
                    </div>
                    <div className="text-sm font-medium leading-5 text-gray-400">tom@example.com
                    </div>
                </div>
            </div>
            <div className="mt-3 px-2 sm:px-3">
                <a href="#"
                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Your
                    Profile
                </a>
                <a href="#"
                   className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Settings
                </a>
                <a href="#"
                   className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Sign
                    out
                </a>
            </div>
        </div>
    </div>)
}

function MenuButton({open, onClick}) {
    return (<button
        className="inline-flex text-gray-800 items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 transition duration-150 ease-in-out"
        aria-label="Main menu" aria-expanded="false" onClick={() => onClick()}>
        {open ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6L18 18" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> : <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"/>
        </svg>}
    </button>)
}

export default function ({items, exam}) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex h-16">
                    <div className="flex justify-between w-full">
                        <Logo exam={exam}/>
                        <div className="hidden md:ml-6 md:flex md:items-center">
                            <Links items={items}/>
                        </div>
                        <div className="flex items-center md:hidden">
                            <MenuButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)}/>
                        </div>
                    </div>
                </div>
            </div>

            {menuOpen ? <MobileMenu items={items}/> : null}
        </nav>
    )

}
