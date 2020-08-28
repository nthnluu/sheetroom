import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import {motion} from "framer-motion"
import {useMutation} from "urql";
import {sendFeedback} from "../../lib/graphql/Feedback";
import { useRouter } from 'next/router'

interface Props {
    title: string;
    onCancel: any;
    isOpen: boolean;
    session: any;
}

const EmojiButton = ({emoji, onClick, selected}) => {
    return <motion.button
                          whileTap={{ scale: 0.9 }} onClick={onClick} className={"rounded-full form-input text-xl h-8 w-8 items-center justify-center select-none inline-flex border shadow-sm focus:outline-none " + (selected ? "shadow-outline-blue border-blue-300" : null)}>{emoji}</motion.button>
}
const FeedbackModal: React.FC<Props> = ({title, onCancel, isOpen, session}) => {
    const router = useRouter()

    const [messageContent, setMessageContent] = useState("")
    const [selectedEmoji, setSelectedEmoji] = useState("")

    const [sendFeedbackResult, mutateFeedback] = useMutation(sendFeedback);

    function cancelModal() {
        onCancel();
        setSelectedEmoji("");
        setMessageContent("");
    }

    function submitModal () {
        mutateFeedback({userId: session ? session.id : null, messageContent: messageContent, reaction: selectedEmoji, url: JSON.stringify(router)})
            .then((result)  => console.log(result))
            .catch(error => console.log(error))
    }

    return (<SimpleModal buttons={<div className="pt-2sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button type="button" onClick={submitModal} disabled={messageContent.length <= 0}
                className={"inline-flex justify-center w-full rounded-md border border-transparent px-6 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 " + (messageContent.length > 0 ? "opacity-100" : "opacity-50 cursor-not-allowed")}>
         Send
        </button>
      </span>
        </div>
        {/*@ts-ignore*/}
    </div>} isOpen={isOpen} onCancel={cancelModal} title={title} content={<div>
      <textarea rows={3} className="form-input w-full resize-none" value={messageContent} onChange={event => setMessageContent(event.target.value)} placeholder="Your feedback..."/>
      <div className="flex justify-start space-x-2 text-xl mt-1">
          <EmojiButton onClick={() => setSelectedEmoji("🤩")} selected={selectedEmoji === "🤩"} emoji="🤩"/>
          <EmojiButton onClick={() => setSelectedEmoji("😀")} selected={selectedEmoji === "😀"} emoji="😀"/>
          <EmojiButton onClick={() => setSelectedEmoji("😟")} selected={selectedEmoji === "😟"} emoji="😟"/>
          <EmojiButton onClick={() => setSelectedEmoji("🤬")} selected={selectedEmoji === "🤬"} emoji="🤬"/>
      </div>

    </div>}
    />)
}

export default FeedbackModal
