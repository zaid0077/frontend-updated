import React from 'react';
import { Pie } from 'react-chartjs-2';


let options = {
    plugins: {
        legend: {
            display: false,
        },
    }
}

const PieChart = (props) => (
    <>
        <Pie
            options={options}
            data={props.data}
        />
    </>
);

export default PieChart;

