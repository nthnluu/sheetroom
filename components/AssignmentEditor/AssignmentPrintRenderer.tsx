import React from "react";
import JsonDebugBox from "../JsonDebugBox";
import InactiveEditor from "../Editor/InactiveEditor";

const AssignmentPrintRenderer = React.forwardRef((props, ref) => {
    //@ts-ignore
    const itemIds = props.document.config.sections.map(section => props.document.sections[section].items).flat()
//@ts-ignore
    return <div ref={ref}>
        {/*//@ts-ignore*/}
        <h1 className="text-2xl font-bold mb-2">{props.title}</h1>

        {/*//@ts-ignore*/}
        {props.document.config.sections.map(section => <div key={section} className="block page-break mt-6">

            {/*//@ts-ignore*/}
            <h2 className="text-lg mb-4 w-full border-b pb-1">{props.document.sections[section].title}</h2>
            <div className="">
                {/*//@ts-ignore*/}
                {props.document.sections[section].items.map((item, index) => <div key={item}>
                    <div className="page-break block"/>
                    <div
                         className="flex-row flex">
                        <div className="mb-6 block">
                            {/*//@ts-ignore*/}
                            <div className="block">
                                {/*//@ts-ignore*/}
                                <InactiveEditor value={props.document.items[item].question}/>
                                {/*//@ts-ignore*/}
                                {props.document.items[item].answer_objects.map((object, index) => {
                                        {/*//@ts-ignore*/}
                                        if (props.document.items[item].controller_type === "MC" || props.document.items[item].controller_type === "MC") {
                                            return (<div key={object} className="block">
                                                <div
                                                     className="flex justify-between">
                                                    <div
                                                        className="text-lg font-semibold text-gray-800 mr-4 ">{String.fromCharCode((index + 1) + 64)}</div>
                                                    <InactiveEditor
                                                        //@ts-ignore
                                                        value={props.document.answer_objects[object].content}/>
                                                </div>
                                            </div>)
                                        } else {
                                            return <div key={object} className="block"/>
                                        }
                                    }
                                )}
                            </div>
                        </div>

                    </div>
                </div>)}
            </div>

        </div>)}

    </div>
});

export default AssignmentPrintRenderer
