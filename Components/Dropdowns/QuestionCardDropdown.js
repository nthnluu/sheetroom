import React, {useContext} from "react";
import {Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import QuizContext from "../QuizEditor/QuizContext";
import InputBase from "@material-ui/core/InputBase";
import withStyles from "@material-ui/core/styles/withStyles";

const QuestionCardDropdown = ({item}) => {
    const {items, setItems} = useContext(QuizContext);

    const handleChange = selectedOption => {
        setItems(prevState => ({...prevState, [item]: {...prevState[item], controller_type: selectedOption.target.value, correct_objects: prevState[item].correct_objects[0]}}));
    };

    const BootstrapInput = withStyles((theme) => ({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 6,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #E4E7EB',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }))(InputBase);


    return (
        <FormControl>
            <Select
                autoWidth
                IconComponent="div"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={items[item].controller_type}
                onChange={handleChange}
                input={<BootstrapInput />}
            >
                <MenuItem value="MC" disableRipple>Multiple Choice</MenuItem>
                <MenuItem value="MA" disableRipple>Multiple Answers</MenuItem>
            </Select>
        </FormControl>
    )
};
export default QuestionCardDropdown
