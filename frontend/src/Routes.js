import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
//import Home from "./base/Home";
import Signup from './user/Signup';
import Signin from './user/Signin';
import Admin from './user/Admin';
import Normaluser from './user/Normaluser';
import UpdateInvoice from './user/UpdateInvoice';
import CreateInvoice from './user/CreateInvoice';
import  UserGraph from './user/UserGraph';
import AdminGraph from './user/AdminGraph';
const Routes = () => {
    return(
       <BrowserRouter>
            <Switch>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/" exact component={Signin}/>
                <Route path="/admin" exact component={Admin}/>
                <Route path="/user" exact component={Normaluser}/>
                <Route path="/user/update/:invoiceId" exact component={UpdateInvoice}/>
                <Route path="/user/create" exact component={CreateInvoice}/>
                <Route path="/graph" exact component={UserGraph}/>
                <Route path="/admin/graph" exact component={AdminGraph}/>
            </Switch>
       </BrowserRouter>
    )
}

export default Routes;