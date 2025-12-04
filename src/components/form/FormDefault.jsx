import React from "react";
export default function FormDefault({ form, onSubmit, children }) {
    const { handleSubmit, register, formState: { errors } } = form;

    if (typeof children === "function") {
        return <form onSubmit={handleSubmit(onSubmit)}>{children({ register, errors })}</form>;
    }

    const clonedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.name) {
            return React.cloneElement(child, {
                register,
                error: errors[child.props.name],
            });
        }
        return child;
    });

    return <form onSubmit={handleSubmit(onSubmit)}>{clonedChildren}</form>;
}
