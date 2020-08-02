import React, {useContext} from "react";
import {Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import QuizContext from "../QuizEditor/QuizContext";
import StyledInput from "./StyledInput";

const QuestionCardDropdown = ({item}) => {
    const {items, setItems} = useContext(QuizContext);

    const handleChange = selectedOption => {
        setItems(prevState => ({...prevState, [item]: {...prevState[item], controller_type: selectedOption.target.value, correct_objects: prevState[item].correct_objects[0]}}));
    };


    return (
        <FormControl>
            <Select
                autoWidth
                IconComponent="div"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={items[item].controller_type}
                onChange={handleChange}
                input={<StyledInput />}
            >
                <MenuItem value="MC" disableRipple>Multiple Choice</MenuItem>
                <MenuItem value="MA" disableRipple>Multiple Answers</MenuItem>
            </Select>
        </FormControl>
    )
};
export default QuestionCardDropdown
