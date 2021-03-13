import React, {useEffect, useState} from "react"
import Axios from "axios";
import { Bar } from 'react-chartjs-2'


const GroupedBar = () => { 
  
  const [Region, setRegion] = useState([])
  const [quantity, setQuantty] = useState([])
  const [datas, setdatas] = useState([])
  const [nameOfRegions, setNameOfRegions] = useState([])
  const [numberOfOccurence, setNumberOfOccurence] = useState([])

  useEffect(()=>{
    Axios.post("https://g54qw205uk.execute-api.eu-west-1.amazonaws.com/DEV/stub",{
        "angular_test" : "angular-developer"})
        .then((response) => {
          setdatas(response.data);

          setQuantty(response.data[0].Quantity);

          var sum = 0
          for(var i=0; i < response.data.length; i++){
           sum = sum + parseInt(response.data[i].Quantity) 
          }


          var regionss = []
          for(var i = 0; i < response.data.length; i++){
            regionss.push(response.data[i].Region);
           setRegion(regionss)}
        
           var result = foo(regionss);
          setNameOfRegions(result[0])
          setNumberOfOccurence(result[1])
    })
  }, []);

  //get number of sale per region start here
  function foo(arr) {
    var a = [],
      b = [],
      prev; 
  
    arr.sort();
    for (var x = 0; x < arr.length; x++) {
      if (arr[x] !== prev) {
        a.push(arr[x]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = arr[x];
    }
    return [a, b];
  }
//get number of sale per region ends here

//get total quantity sold start here
  var holder = {};
  datas.forEach(function(d) {
    if (holder.hasOwnProperty(d.Region)) {
      holder[d.Region] = holder[d.Region] + parseInt(d.Quantity);
    } else {
      holder[d.Region] = parseInt(d.Quantity);
    }
  });

  var reg = [];
  var qty =[];

  for (var prop in holder) {
    reg.push({ Region: prop});
    qty.push({ Quantity: holder[prop] })
  }

  var regions = []
    for(var i = 0; i < reg.length; i++){
      regions.push(reg[i].Region);
    }

  var quant = []
  for(var i = 0; i < reg.length; i++){
    quant.push(qty[i].Quantity);
  }
  //get total quantity sold ends here

  const data = {
    labels: regions,
    datasets: [
      {
        label: 'Quantity Sold',
        data: quant,
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Number of Sales',
        data: numberOfOccurence,
        backgroundColor: 'rgb(54, 162, 235)',
      }
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
  
  return(
  <>
    <div className='header'>
      <h1 className='title'>Sales by Quantity/Region</h1>
    </div>
    <Bar data={data} options={options} />
  </>
)
  }
export default GroupedBar