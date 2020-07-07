import React, {useCallback, useMemo, useState} from 'react'
import isHotkey from 'is-hotkey'
import {Editable, withReact, useSlate, Slate} from 'slate-react'
import {Editor, Transforms, createEditor, Selection} from 'slate'
import {withHistory} from 'slate-history'

import {Button, Icon, Toolbar} from "./Components";
import ToolbarButton from "./Buttons";

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const RichTextExample = () => {
    const [value, setValue] = useState(initialValue)
    const [toolbarOpen, toggleToolbar] = useState(false);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);


    return (
        <div className="group" onMouseOver={() => toggleToolbar(true)} onMouseLeave={() => toggleToolbar(false)}>
            <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                <div className="border rounded-lg py-3 px-4 shadow-sm">
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Start typing…"
                        autoFocus
                        spellCheck={false}
                        isSelected
                        onFocus={() => toggleToolbar(true)}
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
                {toolbarOpen ?
                    <div className="flex justify-between mt-2 border rounded-lg p-1 shadow-lg" style={{width: '20rem'}}>
                        <MarkButton format="bold" icon={<>B</>}/>
                        <MarkButton format="italic" icon={<i>I</i>}/>
                        <MarkButton format="underline" icon={<u>U</u>}/>
                        <MarkButton format="code" icon={<i className="fas fa-code"/>}/>
                        <BlockButton format="heading-one" icon={<span>H1</span>}/>
                        <BlockButton format="heading-two" icon={<span>H2</span>}/>
                        <BlockButton format="block-quote" icon={<i className="fas fa-quote-right"/>}/>
                        <BlockButton format="numbered-list" icon={<i className="fas fa-list-ol"/>}/>
                        <BlockButton format="bulleted-list" icon={<i className="fas fa-list-ul"></i>}/>
                    </div> : null}
            </Slate>
        </div>
    )
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
        split: true,
    })

    Transforms.setNodes(editor, {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    })

    if (!isActive && isList) {
        const block = {type: format, children: []}
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format,
    })

    return !!match
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const Element = ({attributes, children, element}) => {
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        default:
            return <p {...attributes}>{children}</p>
    }
}

const Leaf = ({attributes, children, leaf}) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

const BlockButton = ({format, icon}) => {
    const editor = useSlate()
    return (
        <ToolbarButton active={isBlockActive(editor, format)} icon={icon} color="gray"
                       onMouseDown={() => toggleBlock(editor, format)}/>
    )
}

const MarkButton = ({format, icon}) => {
    const editor = useSlate();
    return (
        <>
            <ToolbarButton active={isMarkActive(editor, format)} onMouseDown={() => toggleMark(editor, format)}
                           icon={icon} color="gray"/>
        </>
    )
}

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

export default RichTextExample
