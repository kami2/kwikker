import React from "react";

export default function Layout(props) {
    console.log(props)
    return (
        <div>
            {props.children}
        </div>
    )
}