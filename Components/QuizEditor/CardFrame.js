import RichTextEditor from "../Editor/RichTextEditor";

const CardFrame = ({item}) => {
    return (
        <div className="bg-white w-full rounded-r-lg py-8 px-8">
            <div className="flex justify-between flex-shrink-0 flex-wrap md:flex-shrink md:flex-no-wrap w-full">
                <div className="w-full border-r border-transparent md:border-gray-200 md:pr-4 md:mr-4 pr-0 mr-0">
                    <h2 className="font-medium mb-1">Question</h2>
                    <RichTextEditor/>
                </div>
                <div className="w-full md:w-64 mx-auto bg-gray-100 h-16 mt-4 md:mt-0">

                </div>
            </div>
        </div>
    )
};

export default CardFrame
