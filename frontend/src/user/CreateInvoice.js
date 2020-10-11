import React, { useState, useEffect } from "react";
import Base from "../base/Base";
import { Link } from "react-router-dom";
import {Redirect} from "react-router-dom";
import {isAuthenticated, createInvoice} from "../auth/api";

const CreateInvoice = ({match}) => {
    const {user, token} = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    amount:"",
    loading:false,
    error:"",
    getaRedirect:false,
    createdInvoice:""
  });

  const {
      name,
      amount,
      loading,
      error,
      getaRedirect,
      updatedInvoice
    } = values;
  
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error:"", loading:false});
    createInvoice(user._id, token, {name,amount})
  .then(data=>{
    if(data.error){
      setValues({...values, error:data.error});
  } else{
      setValues({...values,
        name:"",
      amount:"",
      getaRedirect:true,
      createdInvoice:data.name
  });
  }
  })
  .catch(err=> console.log(err));
  };

//   const successMessage = () =>(
//     <div className="alert alert-success mt-3" 
//     style={{display: createdInvoice? "" : "none"}}>
//         <h4>{createdInvoice} created successfully!</h4>
//     </div>
//   )


  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value}) ;
  };

  const performRedirect = () =>{
        if(getaRedirect){
            return <Redirect to="/user"/>
        }
    }


  const Form = () => {
    return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Invoice Name</label>
                        <input className="form-control" onChange={handleChange("name")} value={name} type="text"/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Amount</label>
                        <input className="form-control"  onChange={handleChange("amount")} value={amount} type="text"/>
                    </div>
                    <button className="btn btn-success btn-block" onClick={onSubmit}>Create</button>
                </form>
            </div>
        </div>
    )
};

  return (
    <Base
      title="Update Invoice"
      className="container bg-info p-4"
    >
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
            {/* {successMessage()} */}
            {Form()}
            {performRedirect()}
            <p>{JSON.stringify(values)}</p>
        </div>
      </div>
    </Base>
  );
};

export default CreateInvoice;
