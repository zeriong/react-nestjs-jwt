import {useState} from "react";

export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const inputOnChange = ({ target: {value} }) => {
        setValue(value);
    };
    return {value, inputOnChange};
}