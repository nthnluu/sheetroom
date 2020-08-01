import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Editable, withReact, useSlate, Slate, ReactEditor} from 'slate-react'
import {Editor, Transforms, createEditor} from 'slate'
import {withHistory} from 'slate-history'
import ToolbarButton from "./Buttons";
import Transition from "../Transition";
import {Element, Leaf, BlockButton, MarkButton} from "./util";

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
};

export const RichTextField = ({active, initialContent, onChangeEvent, border, uniqueId, value}) => {
    // const [value, setValue] = useState(initialContent ? initialContent : initialValue);
    const [toolbarOpen, toggleToolbar] = useState(false);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <div className="group relative" key={uniqueId}>
            <Slate editor={editor} value={initialContent ? initialContent : initialValue} onChange={value1 => onChangeEvent(value1)}>
                <div
                    className={active ? ("border-gray-200 group-hover:border-gray-300 active:border-blue-400 rounded-lg " + (border ? "border shadow-sm py-3 px-4" : "px-4")) : "rounded-lg border border-transparent"}>
                    <Editable
                        autoFocus={false}
                        readOnly={!active}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Start typing…"
                        spellCheck={false}
                    />
                </div>
                <Transition show={toolbarOpen} enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95">
                    <div className="absolute z-50">
                        <div
                            className="flex justify-between mt-2 border bg-white rounded-lg p-2 sm:p-1 shadow w-full sm:w-96 flex-wrap flex-shrink-0 z-50">
                            <MarkButton uniqueId={uniqueId} format="bold" icon={<>B</>}/>
                            <MarkButton uniqueId={uniqueId} format="italic" icon={<i>I</i>}/>
                            <MarkButton uniqueId={uniqueId} format="underline" icon={<u>U</u>}/>
                            <MarkButton uniqueId={uniqueId} format="code"
                                        icon={<i className="fas fa-code"/>}/>
                            <BlockButton uniqueId={uniqueId} format="heading-one" icon={<span>H1</span>}/>
                            <BlockButton uniqueId={uniqueId} format="heading-two" icon={<span>H2</span>}/>
                            <BlockButton uniqueId={uniqueId} format="block-quote"
                                         icon={<i className="fas fa-quote-right"/>}/>
                            <BlockButton uniqueId={uniqueId} format="numbered-list"
                                         icon={<i className="fas fa-list-ol"/>}/>
                            <BlockButton uniqueId={uniqueId} format="bulleted-list"
                                         icon={<i className="fas fa-list-ul"></i>}/>
                            <ToolbarButton uniqueId={uniqueId} icon={<i className="fas fa-bug"/>}
                                           color="red"
                                           onMouseDown={() => console.log(value)}/>
                            <ToolbarButton uniqueId={uniqueId}
                                           icon={<i className="far fa-window-maximize"/>} color="red"
                                           onMouseDown={() => alert(JSON.stringify(value))}/>
                        </div>
                    </div>

                </Transition>
            </Slate>
        </div>
    )
};


export const ReadOnlyEditor = ({active, content}) => {
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    return (
        <div>
            <Slate editor={editor} value={content}>
                <div>
                    <Editable
                        readOnly={true}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                    />
                </div>
            </Slate>
        </div>
    )
};

const initialValue = [{"children": [{"text": ""}], "type": "paragraph"}];

export default RichTextField
