import React, {useState} from "react";
import Select from "react-select";

const QuestionCardDropdown = ({active}) => {
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


    return (
        <Select
            value={dropdownCurrentItem}
            onChange={handleChange}
            options={options}
            styles={customStyles}
            isDisabled={!active}
        />
    )
};
export default QuestionCardDropdown
