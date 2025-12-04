import React from "react";

export default function FormInput({
    label,
    name,
    type = "text",
    register,
    error,
    className = "",
    iconLeft,
    iconRight,
    isReadOnly,
    ...rest
}) {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-white block mb-2"
                >
                    {label}
                </label>
            )}

            <div className="relative flex items-center">
                {iconLeft && (
                    <span className="absolute left-3 text-white/50 text-lg">
                        {iconLeft}
                    </span>
                )}

                <input
                    id={name}
                    type={type}
                    {...register(name)}
                    readOnly={isReadOnly}
                    className={`
            w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl 
            text-white placeholder-white/40 focus:outline-none focus:ring-2 
            focus:ring-white/30 transition
            ${iconLeft ? "pl-12" : ""}
            ${iconRight ? "pr-12" : ""}
            ${className}
          ${isReadOnly ? "cursor-not-allowed opacity-70" : "cursor-text"}
          `}
                    {...rest}
                />

                {iconRight && (
                    <span className="absolute right-3 text-white/50 text-lg cursor-pointer">
                        {iconRight}
                    </span>
                )}
            </div>

            {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
        </div>
    );
}
