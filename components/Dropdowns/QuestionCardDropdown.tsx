import React, {useContext} from "react";
import {Chip, Divider, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import QuizContext from "../AssignmentEditor/QuizContext";
import StyledInput from "./StyledInput";
import update from "immutability-helper";
import {nanoid} from "nanoid";

interface Props {
    item: string;
}

const QuestionCardDropdown: React.FC<Props> = ({item}) => {
    const {document, setDocument} = useContext(QuizContext);

    const handleChange = selectedOption => {

        switch (selectedOption.target.value) {
            case("MC"):
                if (document.items[item].controller_type === "MC" || document.items[item].controller_type === "MA") {
                    setDocument(prevState => {
                        return update(prevState, {
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
                    })
                } else {
                    setDocument(prevState => {
                        const newId = nanoid(5)
                        return update(prevState, {
                            items: {
                                [item]: {
                                    controller_type: {
                                        $set: selectedOption.target.value
                                    },
                                    correct_objects: {
                                        $set: [newId]
                                    },
                                    answer_objects: {
                                        $set: [newId]
                                    }
                                }
                            },
                            answer_objects: {
                                $unset: [document.items[item].answer_objects],
                                $merge: {
                                    [newId]: {
                                        content: "<p><br/></p>"
                                    }
                                }
                            }
                        })
                    })
                }
                break;
            case("MA"):
                if (document.items[item].controller_type === "MC" || document.items[item].controller_type === "MA") {
                    setDocument(prevState => {
                        return update(prevState, {
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
                    })
                } else {
                    setDocument(prevState => {
                        const newId = nanoid(5)
                        return update(prevState, {
                            items: {
                                [item]: {
                                    controller_type: {
                                        $set: selectedOption.target.value
                                    },
                                    correct_objects: {
                                        $set: [newId]
                                    },
                                    answer_objects: {
                                        $set: [newId]
                                    }
                                }
                            },
                            answer_objects: {
                                $unset: [document.items[item].answer_objects],
                                $merge: {
                                    [newId]: {
                                        content: "<p><br/></p>"
                                    }
                                }
                            }
                        })
                    })
                }
                break;
            case("SA"):
                if (document.items[item].controller_type === "SA") {
                    return
                } else {
                    setDocument(prevState => {
                        const newId = nanoid(5)
                        const newData = update(prevState, {
                            items: {
                                [item]: {
                                    controller_type: {
                                        $set: "SA"
                                    },
                                    correct_objects: {
                                        $set: [newId]
                                    },
                                    answer_objects: {
                                        $set: [newId]
                                    }
                                }
                            },
                            answer_objects: {
                                [newId]: {
                                    $set: {
                                        content: "Answer"
                                    }
                                }
                            }
                        })

                        return newData
                    })
                }
                break;
            case("MT"):
                if (document.items[item].controller_type === "MT") {
                    return
                } else {
                    setDocument(prevState => {
                        const newId = nanoid(5)
                        const newData = update(prevState, {
                            items: {
                                [item]: {
                                    controller_type: {
                                        $set: "MT"
                                    },
                                    correct_objects: {
                                        $set: [newId]
                                    },
                                    answer_objects: {
                                        $set: [newId]
                                    }
                                }
                            },
                            answer_objects: {
                                [newId]: {
                                    $set: {
                                        content: "f(x)="
                                    }
                                }
                            }
                        })

                        return newData
                    })
                }
                break;
        }

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
                <Divider/>
                <MenuItem value="SA" disableRipple>Short Answer</MenuItem>
                <Divider/>
                <MenuItem value="MT" disableRipple>
                    <div ><span>Math</span><span
                        className="p-1 border border-gray-300 text-gray-500 rounded-md ml-2 text-xs font-semibold uppercase">Beta</span></div>
                </MenuItem>
            </Select>
        </FormControl>
    )
};
export default QuestionCardDropdown
