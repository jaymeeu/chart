import { Bar } from 'react-chartjs-2'
import React, {useEffect, useState} from "react"
import Axios from "axios";

const VerticalBar = () => {

  const [Region, setRegion] = useState([])
  const [datas, setdatas] = useState([])
  const [nameOfRegions, setNameOfRegions] = useState([])
  const [numberOfOccurence, setNumberOfOccurence] = useState([])
  
          
  useEffect(()=>{
    Axios.post("https://g54qw205uk.execute-api.eu-west-1.amazonaws.com/DEV/stub",{
        "angular_test" : "angular-developer"})
        .then((response) => {
          setdatas(response.data);
  
          var regions = []
          for(var i = 0; i < response.data.length; i++){
            regions.push(response.data[i].Region);
           setRegion(regions)}
        
           var result = foo(regions);
          setNameOfRegions(result[0])
          setNumberOfOccurence(result[1]) 
        
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
    labels: nameOfRegions,
    datasets: [
      {
        label: 'Number of Sale Made',
        data: numberOfOccurence,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)', 
          'rgba(255, 206, 86, 1)', 
          'rgba(75, 192, 192, 1)',
          
        ],
        borderWidth: 1,
      },
    ],
  }
  
  const options = {
      responsive: true,
      
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

  return(
  <>
    <div className='header'>
      <h1 className='title'>Sales Per Region</h1>
     
    </div>
    <Bar data={data} options={options} />
  </>
)
  }
export default VerticalBar