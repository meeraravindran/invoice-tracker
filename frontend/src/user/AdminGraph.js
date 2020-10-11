import React ,{useState, useEffect}from 'react';
import {Bar} from 'react-chartjs-2';
import { isAuthenticated } from '../auth/api';
import { getInvoices, getauser } from '../auth/api';
import Base from '../base/Base';




 //export default class UserGraph extends React.Component {
   //render() {
    const AdminGraph = () =>{
        const[invoices, setInvoices] = useState([]);
        const[Nuser, setNuser] = useState([]);
        const{user, token} = isAuthenticated();
        let total=0;
        const getusername = (invoiceId) =>{
            getauser(user._id,token, invoiceId)
            .then(data=>{
                if(data.error){
                    console.log(data.error);
                }else{
                    setNuser(data.name);
                }
            })
            .catch(err => console.log(err));
        };
        const preload = () =>{
            getInvoices(user._id, token)
            .then(data=>{
                if(data.error){
                    console.log(data.error);
                }else{
                    setInvoices(data);
                }
            })
            .catch(err => console.log(err));
        };
    let datemap = new Map();
    let umap = new Map();
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
      invoices.forEach(invoice => {
        getusername(invoice._id);
        let u=Nuser;
        if(umap.has(u)){
            let a= umap.get(u);
            a++;
            umap.set(u,a);
        }else{
            umap.set(u, 1);
        }
    });
    let label1 = [...umap.keys()];
    let values1=[...umap.values()];
    const state1 = {
        labels: label1,
        datasets: [
          {
            label: 'Invoices',
            backgroundColor: 'rgba(192,192,0,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: values1,
          }
        ]
      }
    return (
      <div>
          <Base title="Welcome Admin" description="Invoices Statistics">
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
        <Bar
          data={state1}
          options={{
            title:{
              display:true,
              text:'Number of invoices per user',
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

export default AdminGraph;