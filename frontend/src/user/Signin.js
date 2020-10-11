import React, {useState} from 'react';
import Base from "../base/Base";
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {signin, authenticate, isAuthenticated} from "../auth/api"
const Signin = () =>{
    const [values, setValues] = useState({
        email: "",
        password: "" ,
        error:"",
        loading:"",
        didRedirect: ""
    });
    
    const {email, password, error, loading, didRedirect} = values;

    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error : false, [name]:event.target.value });
    };

    const onSubmit = event =>{
        event.preventDefault();
        setValues({...values, error: false,loading : true});
        signin({email, password})
        .then(data =>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            } else{
                authenticate(data, ()=>{
                    setValues({...values,didRedirect:true,})
                })
            }
        }).catch(()=>console.log("Sign in failed"));
    }

    const SignInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" onChange={handleChange("email")} value={email} type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control"  onChange={handleChange("password")} value={password} type="password"/>
                        </div>
                        <button className="btn btn-success btn-block" onClick={onSubmit}>SignIn</button>
                    </form>
                </div>
            </div>
        )
    };

    const performRedirect = () =>{

        //TODO: redirection not complete
            if(didRedirect){
                if(user && user.role===1){
                    return <Redirect to="/admin"/>
                    return <p>admin</p>
                }else{
                    return <Redirect to="/user"/>
                    return <p>normal user</p>
                }
            }
            // if(isAuthenticated()){
            //     return <Redirect to="/" />;
            // }
        }

        const loadingMessage = () => {
            return loading &&(
                <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <div className="alert alert-success">Loading...</div>
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
    return(
        <Base>
        {errorMessage()}
        {loadingMessage()}
        {SignInForm()}
        <p className="text-center">Don't have an account?<Link to="/signup">Click here to signup</Link></p>
        {performRedirect()}
        </Base>
    )
}


export default Signin;