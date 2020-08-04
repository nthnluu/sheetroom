import React, {useContext} from "react";
import {Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import QuizContext from "../QuizEditor/QuizContext";
import StyledInput from "./StyledInput";
import update from "immutability-helper";

interface Props {
    item: string;
}

const NewButton: React.FC<Props> = ({}) => {

    const handleChange = selectedOption => {
        // setDocument(prevState => {
        //     const newData = update(prevState, {
        //         items: {
        //             [item]: {
        //                 controller_type: {
        //                     $set: selectedOption.target.value},
        //                 correct_objects: {
        //                     $set: [prevState.items[item].correct_objects[0]]
        //                 }
        //             }
        //         }
        //     })
        //
        //     return newData
        // })
    };


    return (
        <FormControl>
            <Select
                fullWidth
                value="MC"
                IconComponent="div"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                onChange={handleChange}
                input={<StyledInput />}
            >
                <MenuItem value="MC" disableRipple>Multiple Choice</MenuItem>
                <MenuItem value="MA" disableRipple>Multiple Answers</MenuItem>
            </Select>
        </FormControl>
    )
};
export default NewButton
