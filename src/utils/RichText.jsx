import React from "react";

class RichText extends React.Component {
    render() {
        const { text, className } = this.props;
        const parts = text.split(/(\*\*.*?\*\*)/g);

        return (
            <div className={className}>
                {parts.map((part, index) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={index} className="font-semibold text-white">{part.replace(/\*\*/g, "")}</strong>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </div>
        );
    }
}

export default RichText;
