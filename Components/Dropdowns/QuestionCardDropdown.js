import React, {useState} from "react";
import {Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import {Divider} from "@material-ui/core";

const QuestionCardDropdown = ({active, value}) => {
    const [dropdownCurrentItem, setCurrentDropdown] = useState({value: 'MC', label: 'Multiple Choice'});

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            padding: 12,
        }),
        control: (provided, state) => {
            return ({
                ...provided,
                backgroundColor: 'white',
                border: '#E4E7EB 1px solid',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            });

        },
        valueContainer: (provided, state) => {
            const opacity = state.isDisabled ? 'white' : 'white';
            // none of react-select's styles are passed to <Control />
            return ({
                ...provided,
                padding: 8,
            });

        },
    };


    const options = [
        {value: 'MC', label: 'Multiple Choice'},
        {value: 'MA', label: 'Multiple Answers'},
        {value: 'SA', label: 'Short Answer'},
    ];

    const handleChange = selectedOption => {
        setCurrentDropdown(selectedOption);
    };

    const NewMenuItem = ({title, value}) => (<MenuItem value={value}><Box p={1}>
        {title}
    </Box></MenuItem>)


    return (
        <FormControl variant="outlined" fullWidth disabled={!active}>
            <Select
                IconComponent="null"
                value={value}
                onChange={handleChange}
            >
                <MenuItem disableRipple value="MC"><Box p={0}>
                    Multiple Choice
                </Box></MenuItem>

                <MenuItem disableRipple value="MA"><Box p={0}>
                    Multiple Answers
                </Box></MenuItem>

                <MenuItem disableRipple value="DD"><Box p={0}>
                    Dropdown
                </Box></MenuItem>
                <Divider />
                <MenuItem disableRipple value="MF"><Box p={0}>
                    Math Field
                </Box></MenuItem>

                <MenuItem disableRipple value="SA"><Box p={0}>
                    Short Answer
                </Box></MenuItem>

                <MenuItem disableRipple value="PG"><Box p={0}>
                    Paragraph
                </Box></MenuItem>
                <Divider />
                <MenuItem disableRipple value="GR"><Box p={0}>
                    Graph
                </Box></MenuItem>

            </Select>
        </FormControl>
    )
};
export default QuestionCardDropdown
