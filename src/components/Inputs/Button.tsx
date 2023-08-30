import React from 'react'

type TButtonProps = {
    handleClick?: (e: any) => void;
    className?: string;
    buttonText: string;
}

const Button = (props: TButtonProps) => {
    const { handleClick, className, buttonText } = props;

    return (
        <button
            onClick={handleClick}
            className={`bg-white text-black font-bold rounded-sm hover:bg-slate-100 transition-all ${className}`}
        >
            {buttonText}
        </button>
    )
}

export default Button