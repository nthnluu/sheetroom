import React, {useEffect, useState} from "react";
import InactiveQuillEditor from "../../Editor/InactiveQuillEditor";


function AnswerChoice({selected, onClick, value, radioName, choice}) {
    const [focused, setFocus] = useState(false);
    const inputId = 'input-' + choice
    const labelId = 'label-' + choice

    const document = {
        "config": {
            "sections": [
                "e7994900-f919-4a6c-b0e3-5544239fb0ac",
                "cdc39430-adc0-4c40-841e-e1e0bae238b8"
            ]
        },
        "answer_objects": {
            "ea3f247c-6dff-461a-af6d-1abda91bf1cc": {
                "content": "<p><br/></p>"
            },
            "75b6ef97-90d1-45fe-9230-a0faecd9df63": {
                "content": "<p><span class=\"ql-formula\" data-value=\"3.58\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mn>3.58</mn></mrow><annotation encoding=\"application/x-tex\">3.58</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">3</span><span class=\"mord\">.</span><span class=\"mord\">5</span><span class=\"mord\">8</span></span></span></span></span>﻿</span></p>"
            },
            "95ef8563-46b5-43ba-b990-ad995b74dcf3": {
                "content": "<p>1 and 3 only</p>"
            },
            "35e09ddd-2483-4fa5-869d-5c2e67163861": {
                "content": "<p>1,319</p>"
            },
            "4611a918-5cb9-47e9-b57f-f4edba3d49f3": {
                "content": "<p><span class=\"ql-formula\" data-value=\"2.27\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mn>2.27</mn></mrow><annotation encoding=\"application/x-tex\">2.27</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">2</span><span class=\"mord\">.</span><span class=\"mord\">2</span><span class=\"mord\">7</span></span></span></span></span>﻿</span></p>"
            },
            "df536873-13e2-4190-82fa-ff02968e3569": {
                "content": "<p>1 only</p>"
            },
            "bdd86ff1-51f3-4399-b36c-2637193a370b": {
                "content": "<p><span class=\"ql-formula\" data-value=\"1.15\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mn>1.15</mn></mrow><annotation encoding=\"application/x-tex\">1.15</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">1</span><span class=\"mord\">.</span><span class=\"mord\">1</span><span class=\"mord\">5</span></span></span></span></span>﻿</span></p>"
            },
            "489d29e9-a0b4-43e4-948d-2bd828cc9250": {
                "content": "<p><br/></p>"
            },
            "6742e34d-7cf2-4421-a693-36fbf8f93ba1": {
                "content": "<p>2 only</p>"
            },
            "2de56df1-dea7-4b7f-ab85-cad17c8c277c": {
                "content": "<p><br/></p>"
            },
            "fa9a8f7e-ed2f-4654-93be-eb027b3cc24a": {
                "content": "<p>1, 2, and 3</p>"
            },
            "45017bdb-fdbb-419b-aec0-de9a5c8735de": {
                "content": "<p>338</p>"
            },
            "db95754b-225e-47f3-bc76-c80073ecdf26": {
                "content": "<p>506</p>"
            },
            "ac411611-9267-4f26-8727-7da2fa567b41": {
                "content": "<p><br/></p>"
            },
            "f8cdb1ac-083a-449a-9cc7-509695c30338": {
                "content": "<p><br/></p>"
            },
            "a0340069-111f-4f41-9a38-6d007bc62375": {
                "content": "<p><br/></p>"
            },
            "8b9110ae-82fa-4a97-87cc-273b6b8301be": {
                "content": "<p><span class=\"ql-formula\" data-value=\"2.49\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mn>2.49</mn></mrow><annotation encoding=\"application/x-tex\">2.49</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">2</span><span class=\"mord\">.</span><span class=\"mord\">4</span><span class=\"mord\">9</span></span></span></span></span>﻿</span></p>"
            },
            "6e8b23dc-20fb-4639-8b6c-eb44dffdeb7b": {
                "content": "<p>813</p>"
            },
            "6aa50939-d30d-49b0-b9b9-52020549a611": {
                "content": "<p><span class=\"ql-formula\" data-value=\"3.16\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mn>3.16</mn></mrow><annotation encoding=\"application/x-tex\">3.16</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">3</span><span class=\"mord\">.</span><span class=\"mord\">1</span><span class=\"mord\">6</span></span></span></span></span>﻿</span></p>"
            },
            "8025ab9e-db15-4d65-83d6-1359ac38008a": {
                "content": "<p>1 and 2 only</p>"
            },
            "0c7b150a-43d4-4adc-bbea-274578decc2c": {
                "content": "<p>475</p>"
            }
        },
        "items": {
            "fd35aa9f-ddea-4899-b7cb-24c2ee9516eb": {
                "correct_objects": [
                    "2de56df1-dea7-4b7f-ab85-cad17c8c277c"
                ],
                "config": {
                    "points": 10,
                    "shuffle": false,
                    "extra_credit": false
                },
                "answer_objects": [
                    "2de56df1-dea7-4b7f-ab85-cad17c8c277c"
                ],
                "controller_type": "MC",
                "content": "<p>Option</p>"
            },
            "1f6aa028-8d7d-4ac4-8d9e-356fa4aeb655": {
                "correct_objects": [
                    "6e8b23dc-20fb-4639-8b6c-eb44dffdeb7b",
                    "45017bdb-fdbb-419b-aec0-de9a5c8735de"
                ],
                "config": {
                    "points": 10,
                    "shuffle": false,
                    "extra_credit": false
                },
                "answer_objects": [
                    "45017bdb-fdbb-419b-aec0-de9a5c8735de",
                    "0c7b150a-43d4-4adc-bbea-274578decc2c",
                    "db95754b-225e-47f3-bc76-c80073ecdf26",
                    "6e8b23dc-20fb-4639-8b6c-eb44dffdeb7b",
                    "35e09ddd-2483-4fa5-869d-5c2e67163861"
                ],
                "controller_type": "MA",
                "content": "<p>Option</p>",
                "question": "<p>An insect population is growing in such a way that the number in each generation is approximately 1.5 times that of the previous generation. If there are 100 insects in the first generation, approximately how many insects will there be in the fourth generation?</p>"
            },
            "c1a7079c-ef98-4745-bee7-1e706d0805ad": {
                "correct_objects": [
                    "ac411611-9267-4f26-8727-7da2fa567b41"
                ],
                "config": {
                    "points": 10,
                    "shuffle": false,
                    "extra_credit": false
                },
                "answer_objects": [
                    "ac411611-9267-4f26-8727-7da2fa567b41"
                ],
                "controller_type": "MC",
                "content": "<p>Option</p>"
            },
            "5dd12af2-94b7-416c-98cf-982c907f1372": {
                "correct_objects": [
                    "95ef8563-46b5-43ba-b990-ad995b74dcf3"
                ],
                "config": {
                    "points": 10,
                    "shuffle": false,
                    "extra_credit": false
                },
                "answer_objects": [
                    "df536873-13e2-4190-82fa-ff02968e3569",
                    "6742e34d-7cf2-4421-a693-36fbf8f93ba1",
                    "8025ab9e-db15-4d65-83d6-1359ac38008a",
                    "95ef8563-46b5-43ba-b990-ad995b74dcf3",
                    "fa9a8f7e-ed2f-4654-93be-eb027b3cc24a"
                ],
                "controller_type": "MC",
                "content": "<p>Option</p>",
                "question": "<p>Which of the following are true?</p><p><br></p><ol><li>If <span class=\"ql-formula\" data-value=\"x\\ne2\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mi>x</mi><mo mathvariant=\"normal\">≠</mo><mn>2</mn></mrow><annotation encoding=\"application/x-tex\">x\\ne2</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"mord mathnormal\">x</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\"><span class=\"mrel\"><span class=\"mord vbox\"><span class=\"thinbox\"><span class=\"rlap\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"inner\"><span class=\"mrel\"></span></span><span class=\"fix\"></span></span></span></span></span><span class=\"mrel\">=</span></span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">2</span></span></span></span></span>﻿</span>, then <span class=\"ql-formula\" data-value=\"x^2+4\\ne8\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>4</mn><mo mathvariant=\"normal\">≠</mo><mn>8</mn></mrow><annotation encoding=\"application/x-tex\">x^2+4\\ne8</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.897438em; vertical-align: -0.08333em;\"></span><span class=\"mord\"><span class=\"mord mathnormal\">x</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height: 0.814108em;\"><span class=\"\" style=\"top: -3.063em; margin-right: 0.05em;\"><span class=\"pstrut\" style=\"height: 2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right: 0.222222em;\"></span><span class=\"mbin\">+</span><span class=\"mspace\" style=\"margin-right: 0.222222em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"mord\">4</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\"><span class=\"mrel\"><span class=\"mord vbox\"><span class=\"thinbox\"><span class=\"rlap\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"inner\"><span class=\"mrel\"></span></span><span class=\"fix\"></span></span></span></span></span><span class=\"mrel\">=</span></span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">8</span></span></span></span></span>﻿</span>.</li><li>If <span class=\"ql-formula\" data-value=\"x^2+4\\ne8\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>4</mn><mo mathvariant=\"normal\">≠</mo><mn>8</mn></mrow><annotation encoding=\"application/x-tex\">x^2+4\\ne8</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.897438em; vertical-align: -0.08333em;\"></span><span class=\"mord\"><span class=\"mord mathnormal\">x</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height: 0.814108em;\"><span class=\"\" style=\"top: -3.063em; margin-right: 0.05em;\"><span class=\"pstrut\" style=\"height: 2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right: 0.222222em;\"></span><span class=\"mbin\">+</span><span class=\"mspace\" style=\"margin-right: 0.222222em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"mord\">4</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\"><span class=\"mrel\"><span class=\"mord vbox\"><span class=\"thinbox\"><span class=\"rlap\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"inner\"><span class=\"mrel\"></span></span><span class=\"fix\"></span></span></span></span></span><span class=\"mrel\">=</span></span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">8</span></span></span></span></span>﻿</span>, then <span class=\"ql-formula\" data-value=\"x\\ne2\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mi>x</mi><mo mathvariant=\"normal\">≠</mo><mn>2</mn></mrow><annotation encoding=\"application/x-tex\">x\\ne2</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"mord mathnormal\">x</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\"><span class=\"mrel\"><span class=\"mord vbox\"><span class=\"thinbox\"><span class=\"rlap\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"inner\"><span class=\"mrel\"></span></span><span class=\"fix\"></span></span></span></span></span><span class=\"mrel\">=</span></span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">2</span></span></span></span></span>﻿</span>.</li><li>If <span class=\"ql-formula\" data-value=\"x^2+4=8\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>4</mn><mo>=</mo><mn>8</mn></mrow><annotation encoding=\"application/x-tex\">x^2+4=8</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.897438em; vertical-align: -0.08333em;\"></span><span class=\"mord\"><span class=\"mord mathnormal\">x</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height: 0.814108em;\"><span class=\"\" style=\"top: -3.063em; margin-right: 0.05em;\"><span class=\"pstrut\" style=\"height: 2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right: 0.222222em;\"></span><span class=\"mbin\">+</span><span class=\"mspace\" style=\"margin-right: 0.222222em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">4</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">8</span></span></span></span></span>﻿</span>, then <span class=\"ql-formula\" data-value=\"x=2\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mi>x</mi><mo>=</mo><mn>2</mn></mrow><annotation encoding=\"application/x-tex\">x=2</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.43056em; vertical-align: 0em;\"></span><span class=\"mord mathnormal\">x</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">2</span></span></span></span></span>﻿</span>.</li></ol>"
            },
            "f226d001-9607-468a-85b6-57389d7749e8": {
                "correct_objects": [
                    "bdd86ff1-51f3-4399-b36c-2637193a370b"
                ],
                "config": {
                    "points": 10,
                    "shuffle": false,
                    "extra_credit": false
                },
                "answer_objects": [
                    "bdd86ff1-51f3-4399-b36c-2637193a370b",
                    "4611a918-5cb9-47e9-b57f-f4edba3d49f3",
                    "8b9110ae-82fa-4a97-87cc-273b6b8301be",
                    "6aa50939-d30d-49b0-b9b9-52020549a611",
                    "75b6ef97-90d1-45fe-9230-a0faecd9df63"
                ],
                "controller_type": "MC",
                "question": "<p>If <span class=\"ql-formula\" data-value=\"\\ln\\left(x\\right)=1.58\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mi>ln</mi><mo>⁡</mo><mrow><mo fence=\"true\">(</mo><mi>x</mi><mo fence=\"true\">)</mo></mrow><mo>=</mo><mn>1.58</mn></mrow><annotation encoding=\"application/x-tex\">\\ln\\left(x\\right)=1.58</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 1em; vertical-align: -0.25em;\"></span><span class=\"mop\">ln</span><span class=\"mspace\" style=\"margin-right: 0.166667em;\"></span><span class=\"minner\"><span class=\"mopen delimcenter\" style=\"top: 0em;\">(</span><span class=\"mord mathnormal\">x</span><span class=\"mclose delimcenter\" style=\"top: 0em;\">)</span></span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">1</span><span class=\"mord\">.</span><span class=\"mord\">5</span><span class=\"mord\">8</span></span></span></span></span>﻿</span>, then <span class=\"ql-formula\" data-value=\"\\ln\\left(2x\\right)=\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mi>ln</mi><mo>⁡</mo><mrow><mo fence=\"true\">(</mo><mn>2</mn><mi>x</mi><mo fence=\"true\">)</mo></mrow><mo>=</mo></mrow><annotation encoding=\"application/x-tex\">\\ln\\left(2x\\right)=</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 1em; vertical-align: -0.25em;\"></span><span class=\"mop\">ln</span><span class=\"mspace\" style=\"margin-right: 0.166667em;\"></span><span class=\"minner\"><span class=\"mopen delimcenter\" style=\"top: 0em;\">(</span><span class=\"mord\">2</span><span class=\"mord mathnormal\">x</span><span class=\"mclose delimcenter\" style=\"top: 0em;\">)</span></span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\">=</span></span></span></span></span>﻿</span></p>"
            }
        },
        "sections": {
            "e7994900-f919-4a6c-b0e3-5544239fb0ac": {
                "items": [
                    "f226d001-9607-468a-85b6-57389d7749e8",
                    "5dd12af2-94b7-416c-98cf-982c907f1372",
                    "1f6aa028-8d7d-4ac4-8d9e-356fa4aeb655"
                ],
                "title": "Untitled Section"
            },
            "cdc39430-adc0-4c40-841e-e1e0bae238b8": {
                "items": [
                    "c1a7079c-ef98-4745-bee7-1e706d0805ad",
                    "fd35aa9f-ddea-4899-b7cb-24c2ee9516eb"
                ],
                "title": "Untitled Section"
            }
        }
    }

    function checkFocus() {
        if (focused) {
            return ' shadow-outline';
        } else {

        }
    }

    return (
        <>
            <input id={inputId} aria-labelledby={labelId} aria-selected={selected} type="radio"
                   defaultChecked={selected} name={radioName} value={choice}
                   onClick={() => onClick()} className="absolute mt-6 ml-5 opacity-0" onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}/>
            <label id={labelId} htmlFor={inputId} onClick={() => onClick()} tabIndex={-1}
                   className={selected ? 'card selectedCard cursor-pointer' : 'card unselectedCard cursor-pointer ' + checkFocus()}>
                {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
                <span className="table-cell pl-2 w-full">
                    <InactiveQuillEditor value={document.answer_objects[choice].content}/>
                </span>
            </label>
        </>
    )

}


export default function ({choices, questionId, item}) {
    const [selected, setSelected] = useState();
    const radioName = questionId;

    const document = {
        "config": {
            "sections": [
                "e7994900-f919-4a6c-b0e3-5544239fb0ac",
                "cdc39430-adc0-4c40-841e-e1e0bae238b8"
            ]
        },
        "answer_objects": {
            "ea3f247c-6dff-461a-af6d-1abda91bf1cc": {
                "content": "<p><br/></p>"
            },
            "75b6ef97-90d1-45fe-9230-a0faecd9df63": {
                "content": "<p><span class=\"ql-formula\" data-value=\"3.58\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mn>3.58</mn></mrow><annotation encoding=\"application/x-tex\">3.58</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">3</span><span class=\"mord\">.</span><span class=\"mord\">5</span><span class=\"mord\">8</span></span></span></span></span>﻿</span></p>"
            },
            "95ef8563-46b5-43ba-b990-ad995b74dcf3": {
                "content": "<p>1 and 3 only</p>"
            },
            "35e09ddd-2483-4fa5-869d-5c2e67163861": {
                "content": "<p>1,319</p>"
            },
            "4611a918-5cb9-47e9-b57f-f4edba3d49f3": {
                "content": "<p><span class=\"ql-formula\" data-value=\"2.27\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mn>2.27</mn></mrow><annotation encoding=\"application/x-tex\">2.27</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">2</span><span class=\"mord\">.</span><span class=\"mord\">2</span><span class=\"mord\">7</span></span></span></span></span>﻿</span></p>"
            },
            "df536873-13e2-4190-82fa-ff02968e3569": {
                "content": "<p>1 only</p>"
            },
            "bdd86ff1-51f3-4399-b36c-2637193a370b": {
                "content": "<p><span class=\"ql-formula\" data-value=\"1.15\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mn>1.15</mn></mrow><annotation encoding=\"application/x-tex\">1.15</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">1</span><span class=\"mord\">.</span><span class=\"mord\">1</span><span class=\"mord\">5</span></span></span></span></span>﻿</span></p>"
            },
            "489d29e9-a0b4-43e4-948d-2bd828cc9250": {
                "content": "<p><br/></p>"
            },
            "6742e34d-7cf2-4421-a693-36fbf8f93ba1": {
                "content": "<p>2 only</p>"
            },
            "2de56df1-dea7-4b7f-ab85-cad17c8c277c": {
                "content": "<p><br/></p>"
            },
            "fa9a8f7e-ed2f-4654-93be-eb027b3cc24a": {
                "content": "<p>1, 2, and 3</p>"
            },
            "45017bdb-fdbb-419b-aec0-de9a5c8735de": {
                "content": "<p>338</p>"
            },
            "db95754b-225e-47f3-bc76-c80073ecdf26": {
                "content": "<p>506</p>"
            },
            "ac411611-9267-4f26-8727-7da2fa567b41": {
                "content": "<p><br/></p>"
            },
            "f8cdb1ac-083a-449a-9cc7-509695c30338": {
                "content": "<p><br/></p>"
            },
            "a0340069-111f-4f41-9a38-6d007bc62375": {
                "content": "<p><br/></p>"
            },
            "8b9110ae-82fa-4a97-87cc-273b6b8301be": {
                "content": "<p><span class=\"ql-formula\" data-value=\"2.49\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mn>2.49</mn></mrow><annotation encoding=\"application/x-tex\">2.49</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">2</span><span class=\"mord\">.</span><span class=\"mord\">4</span><span class=\"mord\">9</span></span></span></span></span>﻿</span></p>"
            },
            "6e8b23dc-20fb-4639-8b6c-eb44dffdeb7b": {
                "content": "<p>813</p>"
            },
            "6aa50939-d30d-49b0-b9b9-52020549a611": {
                "content": "<p><span class=\"ql-formula\" data-value=\"3.16\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mn>3.16</mn></mrow><annotation encoding=\"application/x-tex\">3.16</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">3</span><span class=\"mord\">.</span><span class=\"mord\">1</span><span class=\"mord\">6</span></span></span></span></span>﻿</span></p>"
            },
            "8025ab9e-db15-4d65-83d6-1359ac38008a": {
                "content": "<p>1 and 2 only</p>"
            },
            "0c7b150a-43d4-4adc-bbea-274578decc2c": {
                "content": "<p>475</p>"
            }
        },
        "items": {
            "fd35aa9f-ddea-4899-b7cb-24c2ee9516eb": {
                "correct_objects": [
                    "2de56df1-dea7-4b7f-ab85-cad17c8c277c"
                ],
                "config": {
                    "points": 10,
                    "shuffle": false,
                    "extra_credit": false
                },
                "answer_objects": [
                    "2de56df1-dea7-4b7f-ab85-cad17c8c277c"
                ],
                "controller_type": "MC",
                "content": "<p>Option</p>"
            },
            "1f6aa028-8d7d-4ac4-8d9e-356fa4aeb655": {
                "correct_objects": [
                    "6e8b23dc-20fb-4639-8b6c-eb44dffdeb7b",
                    "45017bdb-fdbb-419b-aec0-de9a5c8735de"
                ],
                "config": {
                    "points": 10,
                    "shuffle": false,
                    "extra_credit": false
                },
                "answer_objects": [
                    "45017bdb-fdbb-419b-aec0-de9a5c8735de",
                    "0c7b150a-43d4-4adc-bbea-274578decc2c",
                    "db95754b-225e-47f3-bc76-c80073ecdf26",
                    "6e8b23dc-20fb-4639-8b6c-eb44dffdeb7b",
                    "35e09ddd-2483-4fa5-869d-5c2e67163861"
                ],
                "controller_type": "MA",
                "content": "<p>Option</p>",
                "question": "<p>An insect population is growing in such a way that the number in each generation is approximately 1.5 times that of the previous generation. If there are 100 insects in the first generation, approximately how many insects will there be in the fourth generation?</p>"
            },
            "c1a7079c-ef98-4745-bee7-1e706d0805ad": {
                "correct_objects": [
                    "ac411611-9267-4f26-8727-7da2fa567b41"
                ],
                "config": {
                    "points": 10,
                    "shuffle": false,
                    "extra_credit": false
                },
                "answer_objects": [
                    "ac411611-9267-4f26-8727-7da2fa567b41"
                ],
                "controller_type": "MC",
                "content": "<p>Option</p>"
            },
            "5dd12af2-94b7-416c-98cf-982c907f1372": {
                "correct_objects": [
                    "95ef8563-46b5-43ba-b990-ad995b74dcf3"
                ],
                "config": {
                    "points": 10,
                    "shuffle": false,
                    "extra_credit": false
                },
                "answer_objects": [
                    "df536873-13e2-4190-82fa-ff02968e3569",
                    "6742e34d-7cf2-4421-a693-36fbf8f93ba1",
                    "8025ab9e-db15-4d65-83d6-1359ac38008a",
                    "95ef8563-46b5-43ba-b990-ad995b74dcf3",
                    "fa9a8f7e-ed2f-4654-93be-eb027b3cc24a"
                ],
                "controller_type": "MC",
                "content": "<p>Option</p>",
                "question": "<p>Which of the following are true?</p><p><br></p><ol><li>If <span class=\"ql-formula\" data-value=\"x\\ne2\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mi>x</mi><mo mathvariant=\"normal\">≠</mo><mn>2</mn></mrow><annotation encoding=\"application/x-tex\">x\\ne2</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"mord mathnormal\">x</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\"><span class=\"mrel\"><span class=\"mord vbox\"><span class=\"thinbox\"><span class=\"rlap\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"inner\"><span class=\"mrel\"></span></span><span class=\"fix\"></span></span></span></span></span><span class=\"mrel\">=</span></span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">2</span></span></span></span></span>﻿</span>, then <span class=\"ql-formula\" data-value=\"x^2+4\\ne8\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>4</mn><mo mathvariant=\"normal\">≠</mo><mn>8</mn></mrow><annotation encoding=\"application/x-tex\">x^2+4\\ne8</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.897438em; vertical-align: -0.08333em;\"></span><span class=\"mord\"><span class=\"mord mathnormal\">x</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height: 0.814108em;\"><span class=\"\" style=\"top: -3.063em; margin-right: 0.05em;\"><span class=\"pstrut\" style=\"height: 2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right: 0.222222em;\"></span><span class=\"mbin\">+</span><span class=\"mspace\" style=\"margin-right: 0.222222em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"mord\">4</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\"><span class=\"mrel\"><span class=\"mord vbox\"><span class=\"thinbox\"><span class=\"rlap\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"inner\"><span class=\"mrel\"></span></span><span class=\"fix\"></span></span></span></span></span><span class=\"mrel\">=</span></span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">8</span></span></span></span></span>﻿</span>.</li><li>If <span class=\"ql-formula\" data-value=\"x^2+4\\ne8\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>4</mn><mo mathvariant=\"normal\">≠</mo><mn>8</mn></mrow><annotation encoding=\"application/x-tex\">x^2+4\\ne8</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.897438em; vertical-align: -0.08333em;\"></span><span class=\"mord\"><span class=\"mord mathnormal\">x</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height: 0.814108em;\"><span class=\"\" style=\"top: -3.063em; margin-right: 0.05em;\"><span class=\"pstrut\" style=\"height: 2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right: 0.222222em;\"></span><span class=\"mbin\">+</span><span class=\"mspace\" style=\"margin-right: 0.222222em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"mord\">4</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\"><span class=\"mrel\"><span class=\"mord vbox\"><span class=\"thinbox\"><span class=\"rlap\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"inner\"><span class=\"mrel\"></span></span><span class=\"fix\"></span></span></span></span></span><span class=\"mrel\">=</span></span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">8</span></span></span></span></span>﻿</span>, then <span class=\"ql-formula\" data-value=\"x\\ne2\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mi>x</mi><mo mathvariant=\"normal\">≠</mo><mn>2</mn></mrow><annotation encoding=\"application/x-tex\">x\\ne2</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"mord mathnormal\">x</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\"><span class=\"mrel\"><span class=\"mord vbox\"><span class=\"thinbox\"><span class=\"rlap\"><span class=\"strut\" style=\"height: 0.88888em; vertical-align: -0.19444em;\"></span><span class=\"inner\"><span class=\"mrel\"></span></span><span class=\"fix\"></span></span></span></span></span><span class=\"mrel\">=</span></span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">2</span></span></span></span></span>﻿</span>.</li><li>If <span class=\"ql-formula\" data-value=\"x^2+4=8\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>4</mn><mo>=</mo><mn>8</mn></mrow><annotation encoding=\"application/x-tex\">x^2+4=8</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.897438em; vertical-align: -0.08333em;\"></span><span class=\"mord\"><span class=\"mord mathnormal\">x</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height: 0.814108em;\"><span class=\"\" style=\"top: -3.063em; margin-right: 0.05em;\"><span class=\"pstrut\" style=\"height: 2.7em;\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right: 0.222222em;\"></span><span class=\"mbin\">+</span><span class=\"mspace\" style=\"margin-right: 0.222222em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">4</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">8</span></span></span></span></span>﻿</span>, then <span class=\"ql-formula\" data-value=\"x=2\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mi>x</mi><mo>=</mo><mn>2</mn></mrow><annotation encoding=\"application/x-tex\">x=2</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 0.43056em; vertical-align: 0em;\"></span><span class=\"mord mathnormal\">x</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">2</span></span></span></span></span>﻿</span>.</li></ol>"
            },
            "f226d001-9607-468a-85b6-57389d7749e8": {
                "correct_objects": [
                    "bdd86ff1-51f3-4399-b36c-2637193a370b"
                ],
                "config": {
                    "points": 10,
                    "shuffle": false,
                    "extra_credit": false
                },
                "answer_objects": [
                    "bdd86ff1-51f3-4399-b36c-2637193a370b",
                    "4611a918-5cb9-47e9-b57f-f4edba3d49f3",
                    "8b9110ae-82fa-4a97-87cc-273b6b8301be",
                    "6aa50939-d30d-49b0-b9b9-52020549a611",
                    "75b6ef97-90d1-45fe-9230-a0faecd9df63"
                ],
                "controller_type": "MC",
                "question": "<p>If <span class=\"ql-formula\" data-value=\"\\ln\\left(x\\right)=1.58\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mi>ln</mi><mo>⁡</mo><mrow><mo fence=\"true\">(</mo><mi>x</mi><mo fence=\"true\">)</mo></mrow><mo>=</mo><mn>1.58</mn></mrow><annotation encoding=\"application/x-tex\">\\ln\\left(x\\right)=1.58</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 1em; vertical-align: -0.25em;\"></span><span class=\"mop\">ln</span><span class=\"mspace\" style=\"margin-right: 0.166667em;\"></span><span class=\"minner\"><span class=\"mopen delimcenter\" style=\"top: 0em;\">(</span><span class=\"mord mathnormal\">x</span><span class=\"mclose delimcenter\" style=\"top: 0em;\">)</span></span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height: 0.64444em; vertical-align: 0em;\"></span><span class=\"mord\">1</span><span class=\"mord\">.</span><span class=\"mord\">5</span><span class=\"mord\">8</span></span></span></span></span>﻿</span>, then <span class=\"ql-formula\" data-value=\"\\ln\\left(2x\\right)=\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><semantics><mrow><mi>ln</mi><mo>⁡</mo><mrow><mo fence=\"true\">(</mo><mn>2</mn><mi>x</mi><mo fence=\"true\">)</mo></mrow><mo>=</mo></mrow><annotation encoding=\"application/x-tex\">\\ln\\left(2x\\right)=</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height: 1em; vertical-align: -0.25em;\"></span><span class=\"mop\">ln</span><span class=\"mspace\" style=\"margin-right: 0.166667em;\"></span><span class=\"minner\"><span class=\"mopen delimcenter\" style=\"top: 0em;\">(</span><span class=\"mord\">2</span><span class=\"mord mathnormal\">x</span><span class=\"mclose delimcenter\" style=\"top: 0em;\">)</span></span><span class=\"mspace\" style=\"margin-right: 0.277778em;\"></span><span class=\"mrel\">=</span></span></span></span></span>﻿</span></p>"
            }
        },
        "sections": {
            "e7994900-f919-4a6c-b0e3-5544239fb0ac": {
                "items": [
                    "f226d001-9607-468a-85b6-57389d7749e8",
                    "5dd12af2-94b7-416c-98cf-982c907f1372",
                    "1f6aa028-8d7d-4ac4-8d9e-356fa4aeb655"
                ],
                "title": "Untitled Section"
            },
            "cdc39430-adc0-4c40-841e-e1e0bae238b8": {
                "items": [
                    "c1a7079c-ef98-4745-bee7-1e706d0805ad",
                    "fd35aa9f-ddea-4899-b7cb-24c2ee9516eb"
                ],
                "title": "Untitled Section"
            }
        }
    }

    return (
        <>
            <form>
                <fieldset className="pt-2" role="radiogroup">
                    <legend className="font-semibold text-gray-800">Select one:</legend>
                    {document.items[item].answer_objects.map((choice, index) => <AnswerChoice choice={choice} selected={selected === choice} onClick={() => setSelected(choice)}
                                                                              text={choice.content} radioName={item} questionId={questionId} index={index}/>)}
                </fieldset>
            </form>
        </>

    )

}
