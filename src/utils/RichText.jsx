import React from "react";

class RichText extends React.Component {
    render() {
        const { text, className } = this.props;

        const parts = text.split(/(\*\*.*?\*\*)/g);

        return (
            <div className={className}>
                {parts.map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                            <strong key={i} className="font-semibold text-white">
                                {part.replace(/\*\*/g, "")}
                            </strong>
                        );
                    }

                    return (
                        <span key={i}>
                            {part.split("\n").map((line, j) => (
                                <React.Fragment key={j}>
                                    {line}
                                    {j < part.split("\n").length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </span>
                    );
                })}
            </div>
        );
    }
}

export default RichText;
