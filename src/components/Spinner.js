import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function Spinner(props) {
    return (
        <div>
            <Loader
             type="ThreeDots"
             color="#00BFFF"
             height={100}
             width={100}
             visible={props.loading}
            >
            </Loader>
        </div>
    )
}
