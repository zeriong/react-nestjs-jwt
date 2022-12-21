import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    disabled: boolean,
    text: string,
    loading?: boolean,
}

export const FuncButton = (props: ButtonProps) => { // { type, text, disabled, loading, className, onClick }: IButtonProps
    return <button
        {...props}
        style={
            (props.disabled || props.loading) ?
                {
                    pointerEvents: "none",
                    //fontWeight: "500",
                    backgroundColor: "#ccc",
                    color: "#808080"
                } : {}
        }
    >
        {props.loading ? (
            <div className="flex justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24">
                    <circle className="opacity-40" cx="12" cy="12" r="10" stroke="currentColor"
                            stroke-width="4"></circle>
                    <path className="opacity-100" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        ) : props.text}
    </button>
};

/*
export const FuncButton = ({ type, text, disabled, loading, className, onClick }: IButtonProps) => {
    return <button
        type="button"
        className={`${className}`}
        style={
            (disabled || loading) ?
                {
                    pointerEvents: "none",
                    fontWeight: "500",
                    backgroundColor: "#ccc",
                    color: "#808080"
                } : {}
        }
        onClick={() => {
            if (onClick) onClick();
        }}
    >
        {loading ? (
            <div className="flex justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24">
                    <circle className="opacity-40" cx="12" cy="12" r="10" stroke="currentColor"
                            stroke-width="4"></circle>
                    <path className="opacity-100" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        ) : text}
    </button>
};
*/