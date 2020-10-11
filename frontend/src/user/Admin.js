import React, {useState, useEffect} from 'react';
import Base from '../base/Base';
import {Link} from "react-router-dom";
import { isAuthenticated, getInvoices, getauser } from '../auth/api';
//import {API} from "../backend";
//import { getInvoices } from '../auth/api';

const Admin = () => {

    const[invoices, setInvoices] = useState([]);
    const[Nuser, setNuser] = useState();
    const{user, token} = isAuthenticated();
    let total=0;
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

    useEffect(()=>{
        preload();
    },[]);

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
    


    return(
        <Base title="Welcome admin" description="Invoices">
            <div className="row">
            <Link className="btn btn-success"to={`/admin/graph`}>
                                    <span className="">View Graph</span>
                                </Link>
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Number of invoices:{invoices.length}</h2>
                    {invoices && (
                        <div className="row text-center mb-2 ">
                        <div className="col-3">
                            <h3 className="text-white text-left">User</h3>
                        </div>
                        <div className="col-3">
                            <h3 className="text-white text-left">Invoice Name</h3>
                        </div>
                        <div className="col-3">
                            <h3 className="text-white text-left">Date</h3>
                        </div>
                        <div className="col-3">
                            <h3 className="text-white text-left">Amount</h3>
                        </div>
                        </div>
                    )}
                    {invoices.map((invoice,index)=>{
                        getusername(invoice._id);
                        return(
                        
                        <div key={index} className="row text-center mb-2 ">
                            <div className="col-3">
                        <h3 className="text-white text-left">{Nuser}</h3>
                            </div>
                            <div className="col-3">
                                <h3 className="text-white text-left">{invoice.name}</h3>
                            </div>
                            <div className="col-3">
                                <h3 className="text-white text-left">{invoice.updatedAt}</h3>
                            </div>
                            <div className="col-3">
                                <h3 className="text-white text-left">{invoice.amount}</h3>
                            </div>
                        </div>
                        );
                    
                    })
                    }
                    {
                        <div className="row text-center mb-2 ">
                        <div className="col-4">
                            <h3 className="text-white text-left">Total</h3>
                        </div>
                        <div className="col-4">
                            <h3 className="text-white text-left"></h3>
                        </div>
                        <div className="col-4">
                            <h3 className="text-white text-left">{total}</h3>
                        </div>
                        </div>
                    }
                </div>
            </div>
        </Base>
    )
                }

export default Admin;


