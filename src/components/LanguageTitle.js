import * as React from 'react';

export default function LanguageTitle() {
    const title = ["i", "t", "a", "l", "i", "a", "n"];

    return (
        <h1 style={{
            fontSize: "4.5rem",
            fontWeight: 700,
            textTransform: "capitalize",
            textAlign: "center"
        }}>

            <span>☕</span>

            {title.map((letter, index) => {
                if(index % 2) {
                    return (
                        <span key={index} style={{color:"#c0392b"}}>{letter}</span>
                    )
                }

                return (
                    <span key={index} style={{color:"#2ecc71"}}>{letter}</span>
                )
            })}
        </h1>
    )
}