import {useState} from "react";
import {MobileMenu, MenuButton} from "./MobileMenus";

function Links({items}) {

    return items.map(item => <a href="#" className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-darkGray hover:bg-gray-200 focus:outline-none focus:bg-gray-300 transition duration-150 ease-in-out">
        <i className={item.icon }/>{item.label}
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

function ActionButtons({secondaryLabel, primaryLabel}) {
    return (<div className="ml-4 pl-4 border-l border-gray-400">
        <button
            className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-darkGray hover:bg-gray-200 focus:outline-none focus:bg-gray-300 transition duration-150 ease-in-out">
            {secondaryLabel}
        </button>
        <button
            className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-900 transition duration-150 ease-in-out bg-darkGray">
            {primaryLabel}
        </button>
    </div>)
}

export default function ({items, exam, actionButtons}) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white">
            <div className="max-w-5xl mx-auto px-4 lg:px-0">
                <div className="flex h-16">
                    <div className="flex justify-between w-full">
                        <Logo exam={exam}/>
                        <div className="hidden md:ml-6 md:flex md:items-center">
                            <Links items={items} exam={exam}/>
                            <ActionButtons secondaryLabel={actionButtons.secondary.label} primaryLabel={actionButtons.primary.label}/>
                        </div>
                        <div className="flex items-center md:hidden">
                            <MenuButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)}/>
                        </div>
                    </div>
                </div>
            </div>
            {menuOpen ? <MobileMenu items={items} actionButtons={actionButtons}/> : null}
        </nav>
    )

}
