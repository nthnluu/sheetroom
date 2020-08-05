import React, {useContext} from "react";
import {Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import QuizContext from "../QuizEditor/QuizContext";
import StyledInput from "./StyledInput";
import update from "immutability-helper";
import NewTooltip from "../Misc/Tooltip";

interface Props {
    item: string;
}

const QuestionCardDropdown: React.FC<Props> = ({item}) => {
    const {document, setDocument} = useContext(QuizContext);

    const handleChange = selectedOption => {
        setDocument(prevState => {
            const newData = update(prevState, {
                items: {
                    [item]: {
                        controller_type: {
                            $set: selectedOption.target.value
                        },
                        correct_objects: {
                            $set: [prevState.items[item].correct_objects[0] || prevState.items[item].answer_objects[0]]
                        }
                    }
                }
            })

            return newData
        })
    };


    return (
        <FormControl>
            <Select
                autoWidth
                IconComponent="div"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={document.items[item].controller_type}
                onChange={handleChange}
                input={<StyledInput/>}
            >
                <MenuItem value="MC" disableRipple>Multiple Choice</MenuItem>
                <MenuItem value="MA" disableRipple>Multiple Answers</MenuItem>
                <MenuItem value="SA" disableRipple>Short Answer</MenuItem>
            </Select>
        </FormControl>
    )
};
export default QuestionCardDropdown
