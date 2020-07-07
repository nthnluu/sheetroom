import RichTextEditor from "../Editor/RichTextEditor";
import {useState} from "react";
import Transition from "../Transition";


const Calculator = () => {
    const [isOpen, toggleMenu] = useState(false);
    return (
        <div className="relative inline-block text-left w-full mt-2">
            <div>
    <span className="rounded-md shadow-sm">
      <button type="button" onClick={() => toggleMenu(!isOpen)}
              className="inline-flex items-center text-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
              id="options-menu" aria-haspopup="true" aria-expanded="true">
       <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 800"
            className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500">
                                    <circle cx="195" cy="605" r="172.5" fill="currentColor"/>
                                    <path fill="currentColor"
                                          d="M195 455a150 150 0 11-106.07 43.93A149 149 0 01195 455m0-45C87.3 410 0 497.3 0 605s87.3 195 195 195 195-87.3 195-195-87.3-195-195-195z"/>
                                    <circle className="cls-1" fill="none" cx="195" cy="195" r="172.5"/>
                                    <path fill="currentColor"
                                          d="M195 45A150 150 0 1188.93 88.93 149 149 0 01195 45m0-45C87.3 0 0 87.3 0 195s87.3 195 195 195 195-87.3 195-195S302.7 0 195 0z"/>
                                    <g>
                                        <circle className="cls-1" fill="none" cx="605" cy="195" r="172.5"/>
                                        <path fill="currentColor"
                                              d="M605 45a150 150 0 11-106.07 43.93A149 149 0 01605 45m0-45C497.3 0 410 87.3 410 195s87.3 195 195 195 195-87.3 195-195S712.7 0 605 0z"/>
                                    </g>
                                    <g>
                                        <circle className="cls-1" fill="none" cx="605" cy="605" r="172.5"/>
                                        <path fill="currentColor"
                                              d="M605 455a150 150 0 11-106.07 43.93A149 149 0 01605 455m0-45c-107.7 0-195 87.3-195 195s87.3 195 195 195 195-87.3 195-195-87.3-195-195-195z"/>
                                    </g>
                                </svg> No Calculator
      </button>
    </span>
            </div>

            <Transition show={isOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                <div className="origin-top absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50 w-full">
                    <div className="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical"
                         aria-labelledby="options-menu">
                        <div className="py-1">
                            <a href="#"
                               className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">
                                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 800 800"
                                     className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500">
                                    <circle cx="195" cy="605" r="172.5" fill="currentColor"/>
                                    <path fill="currentColor"
                                          d="M195 455a150 150 0 11-106.07 43.93A149 149 0 01195 455m0-45C87.3 410 0 497.3 0 605s87.3 195 195 195 195-87.3 195-195-87.3-195-195-195z"/>
                                    <circle className="cls-1" fill="none" cx="195" cy="195" r="172.5"/>
                                    <path fill="currentColor"
                                          d="M195 45A150 150 0 1188.93 88.93 149 149 0 01195 45m0-45C87.3 0 0 87.3 0 195s87.3 195 195 195 195-87.3 195-195S302.7 0 195 0z"/>
                                    <g>
                                        <circle className="cls-1" fill="none" cx="605" cy="195" r="172.5"/>
                                        <path fill="currentColor"
                                              d="M605 45a150 150 0 11-106.07 43.93A149 149 0 01605 45m0-45C497.3 0 410 87.3 410 195s87.3 195 195 195 195-87.3 195-195S712.7 0 605 0z"/>
                                    </g>
                                    <g>
                                        <circle className="cls-1" fill="none" cx="605" cy="605" r="172.5"/>
                                        <path fill="currentColor"
                                              d="M605 455a150 150 0 11-106.07 43.93A149 149 0 01605 455m0-45c-107.7 0-195 87.3-195 195s87.3 195 195 195 195-87.3 195-195-87.3-195-195-195z"/>
                                    </g>
                                </svg>

                                Multiple Choice
                            </a>
                            <a href="#"
                               className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">
                                <svg
                                    className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                    id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 800 800">
                                    <rect className="cls-1" strokeMiterlimit="10" strokeWidth="45" stroke="currentColor"
                                          fill="none" x="429.5" y="23.5" width="343" height="343" rx="89.93"/>
                                    <rect className="cls-2" strokeMiterlimit="10" strokeWidth="45" stroke="currentColor"
                                          x="19.5" y="23.5" width="343" height="343" rx="89.93" fill="currentColor"/>
                                    <path className="cls-3" strokeMiterlimit="10" stroke="#fff" strokeLinecap="round"
                                          strokeWidth="45" fill="none"
                                          d="M274.79 132.88l-95.32 119.54M121.29 190.95l48.95 61.43"/>
                                    <g>
                                        <rect className="cls-2" strokeMiterlimit="10" strokeWidth="45"
                                              stroke="currentColor" x="433.5" y="434.5" width="343" height="343"
                                              rx="89.93" fill="currentColor"/>
                                        <path className="cls-3" strokeMiterlimit="10" stroke="#fff"
                                              strokeLinecap="round" strokeWidth="45" fill="none"
                                              d="M688.79 543.88l-95.32 119.54M535.29 601.95l48.95 61.43"/>
                                    </g>
                                    <rect className="cls-1" strokeMiterlimit="10" strokeWidth="45" fill="none" x="19.5"
                                          stroke="currentColor"
                                          y="432.5" width="343" height="343" rx="89.93"/>
                                </svg>

                                Multiple Answers
                            </a>
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <div className="py-1">
                            <a href="#"
                               className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">
                                <svg
                                    className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                    data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800.91 800.91">
                                    <rect x="30.73" y="30.73" width="739.46" height="739.46" rx="167.45" fill="none"
                                          stroke="currentColor" stroke-miterlimit="10" stroke-width="65"/>
                                    <path fill="currentColor"
                                          d="M325.69 527.39v-25.6l32.8-3.6-18.4-54H233.3l-18.4 54 32 3.6v25.6h-100v-25.2l17.2-4.4c4.8-1.2 8.4-2.8 10-7.6l88-252.4h56.39L406.89 491c1.6 4.8 4.8 5.6 9.6 6.8l18.4 4.4v25.2zm-38-245.2h-1.2L243.7 409h86.39zM586.49 527.39l-4-23.6-1.2-.4c-17.6 16.8-39.2 28.8-70.4 28.8-50.4 0-57.2-34.4-57.2-56.8 0-40 24.8-59.2 73.6-63.2l50.8-4v-20.4c0-25.2-4.4-38.8-35.2-38.8-22 0-36.8 1.6-36.8 29.2l-43.2-4c0-51.2 46.8-57.6 80.8-57.6 58 0 79.6 16.4 79.6 71.6V491c0 6.4.4 7.2 6.4 8l19.6 2.8v25.6zm-8.4-90l-38 3.2c-30 2.8-39.2 11.2-39.2 30.4s9.2 25.6 25.6 25.6c19.6 0 39.6-12 51.6-24z"/>
                                </svg>
                                Short Answer
                            </a>
                            <a href="#"
                               className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">
                                <svg
                                    className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                    data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800.91 800.91">
                                    <rect x="30.73" y="30.73" width="739.46" height="739.46" rx="167.45" fill="none"
                                          stroke="currentColor" stroke-miterlimit="10" stroke-width="65"/>
                                    <path fill="currentColor"
                                          d="M125.75 567.49l31.16-218c.35-2.1 0-3.5-2.45-3.5H131.7l4.55-35h25.91l3.15-22.4c6.65-46.9 32.55-63.7 70.7-63.7 22.05 0 47.25 8.4 60.2 18.55L277 275.94c-5.6-3.5-20.3-12.6-35.35-12.6s-22.4 8.05-24.5 23.45l-2.8 20.65c-.35 2.45-.35 3.5 2.45 3.5h53.9l-4.9 35h-56.7l-31.19 221.55zM319.3 553.84c-19.95-32.2-36.75-81.55-36.75-132.65 0-76.65 39.55-137.9 85.4-188.3l35.71 23.45C357.11 314.09 338.2 362.39 338.2 425c0 41.65 10.15 74.9 24.85 106.05zM523.36 493.29l-3.85-3.15-15.75-29.05-18.9-32.2-31.86 35.7 18.55 3.15-2.8 25.55h-81.9l2.8-25.2 15.4-2.8c4.2-.7 6.3-2.1 9.8-6L466.3 403 431 346.29c-2.1-3.5-3.15-4.9-7-6l-13.65-3.15 4.2-26.25h55.66l3.5 2.8 16.45 31.5 15.4 25.9 30.44-31.8-17.15-2.45 4.55-25.9h79.45l-3.5 25.9-15.4 3.5c-4.2.7-5.95 2.45-9.8 6.65l-50.05 50.4 38.15 61.25c2.45 3.85 3.85 5.6 7.7 6.3l17.85 2.8-4.2 25.55zM588.8 530.39c46.9-57.75 65.45-106 65.45-168.7 0-41.65-10.15-74.55-24.5-106l43.4-22.75c20.3 32.2 36.75 81.55 36.75 133 0 76.3-39.55 137.55-85 188z"/>
                                </svg>
                                Math
                            </a>
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <div className="py-1">
                            <a href="#"
                               className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">
                                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 800 800"
                                     className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"
                                          strokeWidth="65"
                                          d="M93.7 37.67v668.15M93.31 35L33.5 84.42M93.49 35l59.8 49.42"/>
                                    <g>
                                        <path fill="none" stroke="currentColor" strokeLinecap="round"
                                              strokeMiterlimit="10" strokeWidth="65"
                                              d="M762.33 706.3H102.8a6.86 6.86 0 01-6.68-8.42c20-85.7 191.39-787.65 332.4-326.4 150 490.62 311.6-311.6 311.6-311.6M765 706.69l-49.42 59.81M765 706.51l-49.42-59.8"/>
                                    </g>
                                </svg>
                                Graph
                            </a>
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <div className="py-1">
                            <a href="#"
                               className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">
                                <svg
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Delete
                            </a>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    )
};

const QuestionType = () => {
    const [isOpen, toggleMenu] = useState(false);
    return (
        <div className="relative inline-block text-left w-full">
            <div>
    <span className="rounded-md shadow-sm">
      <button type="button" onClick={() => toggleMenu(!isOpen)}
              className="inline-flex items-center text-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
              id="options-menu" aria-haspopup="true" aria-expanded="true">
       <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 800"
            className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500">
                                    <circle cx="195" cy="605" r="172.5" fill="currentColor"/>
                                    <path fill="currentColor"
                                          d="M195 455a150 150 0 11-106.07 43.93A149 149 0 01195 455m0-45C87.3 410 0 497.3 0 605s87.3 195 195 195 195-87.3 195-195-87.3-195-195-195z"/>
                                    <circle className="cls-1" fill="none" cx="195" cy="195" r="172.5"/>
                                    <path fill="currentColor"
                                          d="M195 45A150 150 0 1188.93 88.93 149 149 0 01195 45m0-45C87.3 0 0 87.3 0 195s87.3 195 195 195 195-87.3 195-195S302.7 0 195 0z"/>
                                    <g>
                                        <circle className="cls-1" fill="none" cx="605" cy="195" r="172.5"/>
                                        <path fill="currentColor"
                                              d="M605 45a150 150 0 11-106.07 43.93A149 149 0 01605 45m0-45C497.3 0 410 87.3 410 195s87.3 195 195 195 195-87.3 195-195S712.7 0 605 0z"/>
                                    </g>
                                    <g>
                                        <circle className="cls-1" fill="none" cx="605" cy="605" r="172.5"/>
                                        <path fill="currentColor"
                                              d="M605 455a150 150 0 11-106.07 43.93A149 149 0 01605 455m0-45c-107.7 0-195 87.3-195 195s87.3 195 195 195 195-87.3 195-195-87.3-195-195-195z"/>
                                    </g>
                                </svg> Multiple Choice
      </button>
    </span>
            </div>

            <Transition show={isOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                <div className="origin-top absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50 w-full">
                    <div className="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical"
                         aria-labelledby="options-menu">
                        <div className="py-1">
                            <a href="#"
                               className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">
                                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 800 800"
                                     className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500">
                                    <circle cx="195" cy="605" r="172.5" fill="currentColor"/>
                                    <path fill="currentColor"
                                          d="M195 455a150 150 0 11-106.07 43.93A149 149 0 01195 455m0-45C87.3 410 0 497.3 0 605s87.3 195 195 195 195-87.3 195-195-87.3-195-195-195z"/>
                                    <circle className="cls-1" fill="none" cx="195" cy="195" r="172.5"/>
                                    <path fill="currentColor"
                                          d="M195 45A150 150 0 1188.93 88.93 149 149 0 01195 45m0-45C87.3 0 0 87.3 0 195s87.3 195 195 195 195-87.3 195-195S302.7 0 195 0z"/>
                                    <g>
                                        <circle className="cls-1" fill="none" cx="605" cy="195" r="172.5"/>
                                        <path fill="currentColor"
                                              d="M605 45a150 150 0 11-106.07 43.93A149 149 0 01605 45m0-45C497.3 0 410 87.3 410 195s87.3 195 195 195 195-87.3 195-195S712.7 0 605 0z"/>
                                    </g>
                                    <g>
                                        <circle className="cls-1" fill="none" cx="605" cy="605" r="172.5"/>
                                        <path fill="currentColor"
                                              d="M605 455a150 150 0 11-106.07 43.93A149 149 0 01605 455m0-45c-107.7 0-195 87.3-195 195s87.3 195 195 195 195-87.3 195-195-87.3-195-195-195z"/>
                                    </g>
                                </svg>

                                Multiple Choice
                            </a>
                            <a href="#"
                               className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">
                                <svg
                                    className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                    id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 800 800">
                                    <rect className="cls-1" strokeMiterlimit="10" strokeWidth="45" stroke="currentColor"
                                          fill="none" x="429.5" y="23.5" width="343" height="343" rx="89.93"/>
                                    <rect className="cls-2" strokeMiterlimit="10" strokeWidth="45" stroke="currentColor"
                                          x="19.5" y="23.5" width="343" height="343" rx="89.93" fill="currentColor"/>
                                    <path className="cls-3" strokeMiterlimit="10" stroke="#fff" strokeLinecap="round"
                                          strokeWidth="45" fill="none"
                                          d="M274.79 132.88l-95.32 119.54M121.29 190.95l48.95 61.43"/>
                                    <g>
                                        <rect className="cls-2" strokeMiterlimit="10" strokeWidth="45"
                                              stroke="currentColor" x="433.5" y="434.5" width="343" height="343"
                                              rx="89.93" fill="currentColor"/>
                                        <path className="cls-3" strokeMiterlimit="10" stroke="#fff"
                                              strokeLinecap="round" strokeWidth="45" fill="none"
                                              d="M688.79 543.88l-95.32 119.54M535.29 601.95l48.95 61.43"/>
                                    </g>
                                    <rect className="cls-1" strokeMiterlimit="10" strokeWidth="45" fill="none" x="19.5"
                                          stroke="currentColor"
                                          y="432.5" width="343" height="343" rx="89.93"/>
                                </svg>

                                Multiple Answers
                            </a>
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <div className="py-1">
                            <a href="#"
                               className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">
                                <svg
                                    className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                    data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800.91 800.91">
                                    <rect x="30.73" y="30.73" width="739.46" height="739.46" rx="167.45" fill="none"
                                          stroke="currentColor" stroke-miterlimit="10" stroke-width="65"/>
                                    <path fill="currentColor"
                                          d="M325.69 527.39v-25.6l32.8-3.6-18.4-54H233.3l-18.4 54 32 3.6v25.6h-100v-25.2l17.2-4.4c4.8-1.2 8.4-2.8 10-7.6l88-252.4h56.39L406.89 491c1.6 4.8 4.8 5.6 9.6 6.8l18.4 4.4v25.2zm-38-245.2h-1.2L243.7 409h86.39zM586.49 527.39l-4-23.6-1.2-.4c-17.6 16.8-39.2 28.8-70.4 28.8-50.4 0-57.2-34.4-57.2-56.8 0-40 24.8-59.2 73.6-63.2l50.8-4v-20.4c0-25.2-4.4-38.8-35.2-38.8-22 0-36.8 1.6-36.8 29.2l-43.2-4c0-51.2 46.8-57.6 80.8-57.6 58 0 79.6 16.4 79.6 71.6V491c0 6.4.4 7.2 6.4 8l19.6 2.8v25.6zm-8.4-90l-38 3.2c-30 2.8-39.2 11.2-39.2 30.4s9.2 25.6 25.6 25.6c19.6 0 39.6-12 51.6-24z"/>
                                </svg>
                                Short Answer
                            </a>
                            <a href="#"
                               className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">
                                <svg
                                    className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                    data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800.91 800.91">
                                    <rect x="30.73" y="30.73" width="739.46" height="739.46" rx="167.45" fill="none"
                                          stroke="currentColor" stroke-miterlimit="10" stroke-width="65"/>
                                    <path fill="currentColor"
                                          d="M125.75 567.49l31.16-218c.35-2.1 0-3.5-2.45-3.5H131.7l4.55-35h25.91l3.15-22.4c6.65-46.9 32.55-63.7 70.7-63.7 22.05 0 47.25 8.4 60.2 18.55L277 275.94c-5.6-3.5-20.3-12.6-35.35-12.6s-22.4 8.05-24.5 23.45l-2.8 20.65c-.35 2.45-.35 3.5 2.45 3.5h53.9l-4.9 35h-56.7l-31.19 221.55zM319.3 553.84c-19.95-32.2-36.75-81.55-36.75-132.65 0-76.65 39.55-137.9 85.4-188.3l35.71 23.45C357.11 314.09 338.2 362.39 338.2 425c0 41.65 10.15 74.9 24.85 106.05zM523.36 493.29l-3.85-3.15-15.75-29.05-18.9-32.2-31.86 35.7 18.55 3.15-2.8 25.55h-81.9l2.8-25.2 15.4-2.8c4.2-.7 6.3-2.1 9.8-6L466.3 403 431 346.29c-2.1-3.5-3.15-4.9-7-6l-13.65-3.15 4.2-26.25h55.66l3.5 2.8 16.45 31.5 15.4 25.9 30.44-31.8-17.15-2.45 4.55-25.9h79.45l-3.5 25.9-15.4 3.5c-4.2.7-5.95 2.45-9.8 6.65l-50.05 50.4 38.15 61.25c2.45 3.85 3.85 5.6 7.7 6.3l17.85 2.8-4.2 25.55zM588.8 530.39c46.9-57.75 65.45-106 65.45-168.7 0-41.65-10.15-74.55-24.5-106l43.4-22.75c20.3 32.2 36.75 81.55 36.75 133 0 76.3-39.55 137.55-85 188z"/>
                                </svg>
                                Math
                            </a>
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <div className="py-1">
                            <a href="#"
                               className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">
                                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 800 800"
                                     className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"
                                          strokeWidth="65"
                                          d="M93.7 37.67v668.15M93.31 35L33.5 84.42M93.49 35l59.8 49.42"/>
                                    <g>
                                        <path fill="none" stroke="currentColor" strokeLinecap="round"
                                              strokeMiterlimit="10" strokeWidth="65"
                                              d="M762.33 706.3H102.8a6.86 6.86 0 01-6.68-8.42c20-85.7 191.39-787.65 332.4-326.4 150 490.62 311.6-311.6 311.6-311.6M765 706.69l-49.42 59.81M765 706.51l-49.42-59.8"/>
                                    </g>
                                </svg>
                                Graph
                            </a>
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <div className="py-1">
                            <a href="#"
                               className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">
                                <svg
                                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Delete
                            </a>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    )
};

const InactiveCard = () => {
    return (
        <p>Hello</p>
    )
};

const CardFrame = ({item}) => {
    const [modalActive, toggleSelected] = useState(true);
    return (
        <div className="bg-white focus:shadow-outline w-full rounded-r-lg py-8 px-8 focus:outline-none">
            <div className="flex justify-between flex-shrink-0 flex-wrap md:flex-shrink md:flex-no-wrap w-full">

                <div className="w-full border-r border-transparent md:border-gray-200 md:pr-4 md:mr-4 pr-0 mr-0">
                    {modalActive ? <RichTextEditor/> : <InactiveCard/>}
                </div>
                <div className="w-full md:w-64 mx-auto mt-4 md:mt-0">
                    <QuestionType/>
                    <Calculator/>
                </div>
            </div>
        </div>
    )
};

export default CardFrame
