
import './App.css';
import React, {useEffect, useState} from "react"
import Axios from "axios";
import  VerticalBar from './Charts/BarChart';
import  PieChart from './Charts/PieChart';
import  LineChart from './Charts/LineChart';
import GroupedBar from './Charts/GroupedBar';
import {animateScroll as scroll} from 'react-scroll';

function App(props) {


const [data, setdata] = useState([])



  useEffect(()=>{
    
      Axios.post("https://g54qw205uk.execute-api.eu-west-1.amazonaws.com/DEV/stub",{
          "angular_test" : "angular-developer"})
          .then((response) => {
          console.log(response.data);
          setdata(response.data)
      })
}, []);
//for sticky nav bar start here

document.addEventListener('DOMContentLoaded', function() {
  // When the event DOMContentLoaded occurs, it is safe to access the DOM

  // When the user scrolls the page, execute myFunction 
  window.addEventListener('scroll', myFunctionForSticky);

  // Get the navbar
  var navbar = document.getElementById("navbar");

  // Get the offset position of the navbar
  var sticky = navbar.offsetTop;

  // Add the sticky class to the navbar when you reach its scroll position. 
  // Remove "sticky" when you leave the scroll position

  function myFunctionForSticky() {
    if (window.pageYOffset >= sticky) {
      console.log("window.pageYOffset >= sticky");
    } else {
      console.log("Not window.pageYOffset >= sticky");
    }
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }

 //for sticky nav bar ends here
})

  return (
    <div className="App">
      <div className = "topNav" id="navbar">
        <button className="btn" onClick={()=> scroll.scrollToTop()}>Sales per city </button>
        <button className="btn" onClick={()=> scroll.scrollTo(600)}>Sales per region</button>
        <button className="btn" onClick={()=> scroll.scrollTo(1300)}>Sales by Category</button>
        <button className="btn" onClick={()=> scroll.scrollToBottom()}>Sales by Quantity</button>
      </div>
    
       <div className="Chart" id='line' > 
          <LineChart options={{ 
            responsive: true
          }}/>
      </div>
      
        <div className="Chart" id='bar' > 
          <VerticalBar options={{
            responsive: true
          }}/>
        </div>
 
        <div className="Chart" id='pie'> 
          <PieChart options={{ 
            responsive: true
          }}/>
      </div>
      
      <div className="Chart" id='group'> 
      <GroupedBar options={{ 
        responsive: true
      }}/></div>
 
    </div>
    
  );
}

export default App;

