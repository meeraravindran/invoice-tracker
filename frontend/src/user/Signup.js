import React, {useState} from 'react'
import Base from "../base/Base"
import {Link} from "react-router-dom"
import {signup} from "../auth/api"
const Signup = () =>{
    const [values, setValues] = useState({
        name : "",
        email: "",
        password : "",
        error : "",
        success : ""
    });

    const {name, email, password, error, success} = values

    const handleChange = name => event => {
        setValues({...values, error : false, [name]:event.target.value });
    };

    const onSubmit = event => {
        //console.log("entered");
        event.preventDefault();
        setValues({...values, error:false});
        signup({name, email, password})
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, success: false});
            }else{
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true
                });
            }
        })
        .catch(()=>console.log("Signup failed"));
    };

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
            New account was created successfully!! <Link to="/">Click here to login</Link>
                    </div>
                </div>
            </div>
        )};

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-warning" style={{display: error ? "" : "none"}}>
                        {error}
                    </div>
                </div>
            </div>
        )};

    const SignUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" value={name} onChange={handleChange("name")}  type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" value={email} onChange={handleChange("email")} type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" value={password} onChange={handleChange("password")} type="password"/>
                        </div>
                        <button className="btn btn-success btn-block" onClick={onSubmit}>SignUp</button>
                    </form>
                </div>
            </div>
        )
    };

    return(
        <Base>
        {successMessage()}
        {errorMessage()}
        {SignUpForm()}
        <p className="text-center">Don't have an account?<Link to="/">Login here</Link></p>
        </Base>
    )

}
export default Signup;