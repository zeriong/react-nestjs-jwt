import {useState} from "react";

export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const inputOnChange = event => {
        const { target: {value} } = event;
        setValue(value);
    };
    return {value, inputOnChange};
}