
import { Line } from 'react-chartjs-2'
import React, {useEffect, useState} from "react"
import Axios from "axios";

const LineChart = () =>{
  
const [chartData, setdata] = useState([])
const [city, setCity] = useState([])
const [nameOfCity, setNameOfCity] = useState([])
const [numberOfSale, setnumberOfSale] = useState([])

useEffect(()=>{
  Axios.post("https://g54qw205uk.execute-api.eu-west-1.amazonaws.com/DEV/stub",{
      "angular_test" : "angular-developer"})
      .then((response) => {
        setdata(response.data);

        var cities = []
        for(var i = 0; i < response.data.length; i++){
          cities.push(response.data[i].City);
         setCity(cities)}
      
         var result = foo(cities);
        setNameOfCity(result[0])
        setnumberOfSale(result[1]) 
  })
}, []);

function foo(arr) {
  var a = [],
    b = [],
    prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [a, b];
}

const data = {
  labels: nameOfCity,
  datasets: [
    {
      label: 'Number of Sales',
      data: numberOfSale,
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

  return (
  <>
  
    <div className='header'>
      <h1 className='title'>Sales Per City in United State</h1>
      
    </div>
    <Line data={data} options={options} />
  </>
)}

export default LineChart