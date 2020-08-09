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

const SectionCalculatorDropdown: React.FC<Props> = ({item}) => {
    const {document, setDocument} = useContext(QuizContext);

    const handleChange = selectedOption => {

    };


    return (
        <FormControl>
            <Select
                autoWidth
                IconComponent="div"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={"MC"}
                onChange={handleChange}
                input={<StyledInput/>}
            >
                <MenuItem value="MC" disableRipple>No Calculator</MenuItem>
                <MenuItem value="MA" disableRipple>Scientific Calculator</MenuItem>
                <MenuItem value="SA" disableRipple>Graphing Calculator</MenuItem>
            </Select>
        </FormControl>
    )
};
export default SectionCalculatorDropdown
