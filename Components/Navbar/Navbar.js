import {useState} from "react";
import {MobileMenu, MenuButton} from "./MobileMenus";
import {useRouter} from 'next/router'

function Links({items}) {

    return items.map((item, i) => <a href="#" key={i}
                                     className="ml-2 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 transition duration-150 ease-in-out">
        <i className={item.icon}/>{item.label}
    </a>);
}

function Logo({exam}) {
    return (<div className="flex-shrink-0 flex items-center">
        {/*Logo for small screens*/}
        {exam ? <img className="block lg:hidden h-8 w-auto" role="link" src="/hw_symbol.svg"
                     alt=""/> : <img className="block lg:hidden h-8 w-auto" src="/hw_logo.svg"
                                     alt="Homework home"/>}
        {/*Logo for large screens*/}
        <img className="hidden lg:block h-8 w-auto" role="link" src="/hw_logo.svg"
             alt="Homework home"/>
    </div>);
}

function ActionButtons({secondaryLabel, primaryLabel, primaryHref, secondaryHref}) {
    const router = useRouter();

    return (<div className="ml-4 pl-4 border-l border-gray-400 w-auto flex-shrink-0">
        {secondaryLabel ? <button onClick={() => router.push(secondaryHref)}
                                  className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 transition duration-150 ease-in-out">
            {secondaryLabel}
        </button> : null}
        {primaryLabel ? <button onClick={() => router.push(primaryHref)}
                                className="ml-2 px-3 py-2 rounded-md text-sm font-medium leading-5 text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-600 focus:shadow-outline transition duration-150 ease-in-out bg-gray-900">
            {primaryLabel}
        </button> : null}
    </div>)
}

export default function ({items, exam, actionButtons, sticky}) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={sticky ? "bg-white stickyNav fixed top-0 w-full z-50" : "bg-white"}
             aria-label="Main navigation">
            <div className="max-w-6xl mx-auto px-4 lg:px-0">
                <div className="flex h-16">
                    <div className="flex justify-between w-full">
                        <Logo exam={exam}/>
                        {exam ? <div className="flex flex-no-wrap items-center">
                            <Links items={items} exam={exam}/>
                            <ActionButtons secondaryLabel={actionButtons.secondary.label}
                                           primaryLabel={actionButtons.primary.label}/>
                        </div> : <div className="hidden md:ml-6 md:flex md:items-center">
                            <Links items={items} exam={exam}/>
                            <ActionButtons secondaryLabel={actionButtons.secondary.label}
                                           secondaryHref={actionButtons.secondary.href}
                                           primaryLabel={actionButtons.primary.label}
                                           primaryHref={actionButtons.primary.href}/>
                        </div>}
                        {!exam ? <div className="flex items-center md:hidden">
                            <MenuButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)}/>
                        </div> : null}
                    </div>
                </div>
            </div>
            {menuOpen ? <MobileMenu items={items} actionButtons={actionButtons}/> : null}
        </nav>
    )

}
