import React, {useState, useEffect} from 'react';
import Base from '../base/Base';
import {Link} from "react-router-dom";
import { isAuthenticated } from '../auth/api';
import { getInvoices, delInvoice } from '../auth/api';

const Normaluser = () => {

    const[invoices, setinvoices] = useState([]);
    //const [total,setTotal]= useState([]);
    const [values, setValues] = useState({
        total:"",
        date:""
    });
    
    const{user, token} = isAuthenticated();
   // const[date, setdate] = useState([]);
    const convert=(date)=>{
        let d = new Date(date);
        //setdate(d.getDate()+'-' + (d.getMonth()+1) + '-'+d.getFullYear());
        //setValues({...values, date:d.getDate()+'-' + (d.getMonth()+1) + '-'+d.getFullYear()});
    }
    const preload = () =>{
        getInvoices(user._id,token)
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                setinvoices(data);
            }
        })
    };

    useEffect(()=>{
        preload();
    },[]);

    const deleteInvoice= invoiceId =>{
        delInvoice(user._id, invoiceId, token)
        .then(data=>{
            if(data.error){
                console.log(data.error);
             }else{
                 preload();
             }
        })
        .catch(err=> console.log(err));
    }

    return(
        <Base title="Welcome" description="Invoices">
            <div className="row">
            <Link className="btn btn-success"to={`/graph`}>
                                    <span className="">View Graph</span>
                                </Link>
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Number of Invoices:{invoices.length}</h2>
                    <Link className="btn btn-primary"to={`/user/create`}>
                                    <span className="">Create New Invoice</span>
                                </Link>
                    {invoices && (
                        <div className="row text-center mb-2 ">
                        <div className="col-2">
                            <h3 className="text-white text-left">Invoice Name</h3>
                        </div>
                        <div className="col-4">
                            <h3 className="text-white text-left">Date</h3>
                        </div>
                        <div className="col-2">
                            <h3 className="text-white text-left">Invoice Amount</h3>
                        </div>
                        <div className="col-2">
                            <h3 className="text-white text-left">Update</h3>
                        </div>
                        <div className="col-2">
                            <h3 className="text-white text-left">Delete</h3>
                        </div>
                        </div>
                    )}
                    {invoices.map((invoice,index)=>{
                        return(
                        <div key={index} className="row text-center mb-2 ">
                            <div className="col-2">
                                <h3 className="text-white text-left">{invoice.name}</h3>
                            </div>
                            <div className="col-4">
                                <h3 className="text-white text-left">{values.date}</h3>
                            </div>
                            <div className="col-2">
                                <h3 className="text-white text-left">{invoice.amount}</h3>
                            </div>
                            <div className="col-2">
                                <Link className="btn btn-success"to={`/user/update/${invoice._id}`}>
                                    <span className="">Update</span>
                                </Link>
                            </div>
                            <div className="col-2">
                                <button onClick={() => {deleteInvoice(invoice._id)}} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                        );
                    })}
                    <div>Total:{values.total}</div>
                </div>
            </div>
        </Base>
    )
}

export default Normaluser;