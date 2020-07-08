import React, {useCallback, useMemo, useState} from 'react'
import isHotkey from 'is-hotkey'
import {Editable, withReact, useSlate, Slate} from 'slate-react'
import {Editor, Transforms, createEditor} from 'slate'
import {withHistory} from 'slate-history'
import ToolbarButton from "./Buttons";
import Transition from "../Transition";
import {toggleMark, Element, Leaf, BlockButton, MarkButton} from "./util";

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

export const RichTextField = ({active, initialContent}) => {
    const [value, setValue] = useState(initialContent);
    const [toolbarOpen, toggleToolbar] = useState(false);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);


    return (
        <div className="group py-8 -mt-8" onMouseOver={() => {
            if (active) {
                toggleToolbar(true)
            } else {
                return
            }
        }}
             onMouseLeave={() => toggleToolbar(false)}>
            <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                <div
                    className={active ? "border border-gray-100 group-hover:border-gray-300 active:border-blue-400 rounded-lg py-3 px-4 shadow-sm " : "rounded-lg py-3 px-4 border border-transparent"}>
                    <Editable
                        readOnly={!active}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Start typing…"
                        spellCheck={false}
                        isSelected
                        onFocus={() => toggleToolbar(true)}
                        onBlur={(event) => event.preventDefault()}
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault()
                                    const mark = HOTKEYS[hotkey]
                                    toggleMark(editor, mark)
                                }
                            }
                        }}
                    />
                </div>

                <Transition show={toolbarOpen} enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95">
                    <div
                        className="flex justify-between mt-2 border rounded-lg p-2 sm:p-1 shadow w-full sm:w-96 flex-wrap flex-shrink-0">
                        <MarkButton format="bold" icon={<>B</>}/>
                        <MarkButton format="italic" icon={<i>I</i>}/>
                        <MarkButton format="underline" icon={<u>U</u>}/>
                        <MarkButton format="code" icon={<i className="fas fa-code"/>}/>
                        <BlockButton format="heading-one" icon={<span>H1</span>}/>
                        <BlockButton format="heading-two" icon={<span>H2</span>}/>
                        <BlockButton format="block-quote" icon={<i className="fas fa-quote-right"/>}/>
                        <BlockButton format="numbered-list" icon={<i className="fas fa-list-ol"/>}/>
                        <BlockButton format="bulleted-list" icon={<i className="fas fa-list-ul"></i>}/>
                        <ToolbarButton icon={<i className="fas fa-bug"/>} color="gray"
                                       onMouseDown={() => console.log(value)}/>
                    </div>
                </Transition>
            </Slate>
        </div>
    )
};

export const RichTextEditor = ({active}) => {
    const [value, setValue] = useState(initialValue);
    const [toolbarOpen, toggleToolbar] = useState(false);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);


    return (
        <div className="group py-8 -mt-8" onMouseOver={() => {
            if (active) {
                toggleToolbar(true)
            } else {
                return
            }
        }}
             onMouseLeave={() => toggleToolbar(false)}>
            <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                <div
                    className={active ? "border border-gray-100 group-hover:border-gray-300 active:border-blue-400 rounded-lg py-3 px-4 shadow-sm " : "rounded-lg py-3 px-4 border border-transparent"}>
                    <Editable
                        readOnly={!active}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Start typing…"
                        spellCheck={false}
                        isSelected
                        onFocus={() => toggleToolbar(true)}
                        onBlur={(event) => event.preventDefault()}
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault()
                                    const mark = HOTKEYS[hotkey]
                                    toggleMark(editor, mark)
                                }
                            }
                        }}
                    />
                </div>

                <Transition show={toolbarOpen} enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95">
                    <div
                        className="flex justify-between mt-2 border rounded-lg p-2 sm:p-1 shadow w-full sm:w-96 flex-wrap flex-shrink-0">
                        <MarkButton format="bold" icon={<>B</>}/>
                        <MarkButton format="italic" icon={<i>I</i>}/>
                        <MarkButton format="underline" icon={<u>U</u>}/>
                        <MarkButton format="code" icon={<i className="fas fa-code"/>}/>
                        <BlockButton format="heading-one" icon={<span>H1</span>}/>
                        <BlockButton format="heading-two" icon={<span>H2</span>}/>
                        <BlockButton format="block-quote" icon={<i className="fas fa-quote-right"/>}/>
                        <BlockButton format="numbered-list" icon={<i className="fas fa-list-ol"/>}/>
                        <BlockButton format="bulleted-list" icon={<i className="fas fa-list-ul"></i>}/>
                        <ToolbarButton icon={<i className="fas fa-bug"/>} color="gray"
                                       onMouseDown={() => console.log(value)}/>
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

const initialValue = [
    {
        type: 'paragraph',
        children: [
            {text: 'This is editable '},
            {text: 'rich', bold: true},
            {text: ' text, '},
            {text: 'much', italic: true},
            {text: ' better than a '},
            {text: '<textarea>', code: true},
            {text: '!'},
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    "Since it's rich text, you can do things like turn a selection of text ",
            },
            {text: 'bold', bold: true},
            {
                text:
                    ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'block-quote',
        children: [{text: 'A wise quote.'}],
    },
    {
        type: 'paragraph',
        children: [{text: 'Try it out for yourself!'}],
    },
]

export default RichTextField
