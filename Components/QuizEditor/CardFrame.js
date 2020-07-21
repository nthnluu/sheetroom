import {useEffect, useState} from "react";
import RichTextField from "../Editor/SlateEditor";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_ITEM_CONTENT} from "../../gql/assignmentAutosave";
import MultipleChoiceController from "./Controllers/MultipleChoice";
import QuestionCardDropdown from "../Dropdowns/QuestionCardDropdown";


const CardFrame = ({itemData, active, setSaveStatus, index}) => {
    const [item, setItemData] = useState(itemData);

    //autosave logic
    const [updateContent, {contentData}] = useMutation(UPDATE_ITEM_CONTENT);

    const saveContent = (value) => {
        setSaveStatus(1);
        updateContent({variables: {pk: item.id, content: value}})
            .then(() => setSaveStatus(0))
            .catch(() => setSaveStatus(2));
    };

    useEffect(() => {
        setItemData(itemData)
    }, [itemData]);

    return (
        <div className="bg-white focus:shadow-outline w-full pt-2 pb-8 px-8 focus:outline-none rounded-lg">
            <div className="flex justify-between flex-shrink-0 flex-wrap md:flex-shrink md:flex-no-wrap w-full">
                <div className="w-full border-r border-transparent md:border-gray-200 md:pr-4 md:mr-4 pr-0 mr-0">
                    <div className="mb-8">
                        <h2 className="font-semibold text-gray-800 text-lg mb-3">Question {index + 1}</h2>
                        <RichTextField border active={active} initialContent={item.content}
                                       onBlurEvent={(value) => saveContent(value)} uniqueId={item.id}/>
                    </div>
                    <MultipleChoiceController itemId={item.id} setSaveStatus={status => setSaveStatus(status)} active={active} choices={item.answer_choices}/>

                </div>
                <div className="w-full md:w-64 mx-auto mt-4 md:mt-0">
                    <QuestionCardDropdown active={active}/>
                </div>
            </div>
        </div>
    )
};

export default CardFrame
