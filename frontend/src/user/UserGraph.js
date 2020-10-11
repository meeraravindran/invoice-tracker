import React ,{useState, useEffect}from 'react';
import {Bar} from 'react-chartjs-2';
import { isAuthenticated } from '../auth/api';
import { getInvoices } from '../auth/api';
import Base from '../base/Base';




 //export default class UserGraph extends React.Component {
   //render() {
    const UserGraph = () =>{
    const[invoices, setinvoices] = useState([]);
const{user, token} = isAuthenticated();
let name = user.name;
const preload = () =>{
    getInvoices(user._id,token)
    .then(data=>{
        if(data.error){
            console.log(data.error);
        }else{
            setinvoices(data);
        }
    })
    .catch(err => console.log(err));
    //console.log(invoices);
};
    let datemap = new Map();
    preload();
    invoices.forEach(invoice => {
        let d = new Date(invoice.createdAt);
        let date=d.getDate()+'-' + (d.getMonth()+1) + '-'+d.getFullYear();
        if(datemap.has(date)){
            let a= datemap.get(date);
            a++;
            datemap.set(date,a);
        }else{
            datemap.set(date, 1);
        }
    });
    let label = [...datemap.keys()];
    let values=[...datemap.values()];
    const state = {
        labels: label,
        datasets: [
          {
            label: 'Invoices',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: values,
          }
        ]
      }
    return (
      <div>
          <Base title={name} description="Average Invoices">
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Number of invoices per date',
              fontSize:20,
            },
            legend:{
              display:true,
              position:'right'
            },
            scales:{
                yAxes: [{
                    ticks: {
                      beginAtZero: true,
                      min: 0
                    }    
                  }]
            }
          }}
        />
        </Base>
      </div>
    );
  }
//}

export default UserGraph;