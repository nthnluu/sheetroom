// Import React dependencies.
import React, {useEffect, useMemo, useState} from "react";
// Import the Slate editor factory.
import {createEditor} from 'slate'

// Import the Slate components and React plugin.
import {Slate, Editable, withReact} from 'slate-react'

const RichTextEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), []);

    // Keep track of state for the value of the editor.
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{text: 'A line of text in a paragraph.'}],
        },
    ]);

    return (
        <>
            <div className="border rounded-lg p-2 shadow-sm focus:border-gray-700 ">
                <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
                    <Editable className="p-2" onKeyDown={event => {
                        console.log(event.key)
                    }}/>
                </Slate>
            </div>
            <div className="rounded-lg border border-gray-200 shadow p-1 text-lg mt-2 text-center w-64">
                <div className="flex justify-center">
                    <div className="pr-1 w-auto">
                        <button
                            className="font-bold h-8 w-8 text-base text-blue-500 hover:bg-blue-100 hover:text-blue-600 active:text-blue-700 focus:text-blue-600 rounded focus:bg-blue-100 active:bg-blue-200 focus:outline-none transition-color duration-150">
                            <i className="fas fa-magic"/></button>
                    </div>
                    <div className="pr-1 mr-1 pl-1 border-l border-r w-auto">
                        <button
                            className="font-bold h-8 w-8 text-gray-700 hover:bg-gray-100 hover:text-gray-600 active:text-gray-800 focus:text-gray-500 rounded focus:bg-gray-100 active:bg-gray-200 focus:outline-none transition-color duration-150">B
                        </button>
                        <button
                            className="font-bold h-8 w-8 text-gray-700 hover:bg-gray-100 hover:text-gray-600 active:text-gray-800 focus:text-gray-500 rounded focus:bg-gray-100 active:bg-gray-200 focus:outline-none transition-color duration-150">
                            <i>I</i></button>
                        <button
                            className="font-bold h-8 w-8 text-gray-700 hover:bg-gray-100 hover:text-gray-600 active:text-gray-800 focus:text-gray-500 rounded focus:bg-gray-100 active:bg-gray-200 focus:outline-none transition-color duration-150">
                            <u>U</u></button>
                        <button
                            className="font-bold h-8 text-base w-8 text-gray-700 hover:bg-gray-100 hover:text-gray-600 active:text-gray-800 focus:text-gray-500 rounded focus:bg-gray-100 active:bg-gray-200 focus:outline-none transition-color duration-150">
                            <i className="fas fa-strikethrough"/></button>
                    </div>
                    <div className="pr-1 mr-1 w-auto">
                        <button
                            className="font-bold h-8 text-base w-8 text-gray-700 hover:bg-gray-100 hover:text-gray-600 active:text-gray-800 focus:text-gray-500 rounded focus:bg-gray-100 active:bg-gray-200 focus:outline-none transition-color duration-150">
                            <i className="fas fa-square-root-alt"/></button>
                    </div>
                </div>
            </div>
        </>

    )
};

export default RichTextEditor;
