import {API} from "../backend"

export const signup = user => {
    return fetch(`https://tracker-backend1.herokuapp.com/api/signup`, {
        method:"POST",
        headers:{
            Accept : "application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
    return fetch(`https://tracker-backend1.herokuapp.com/api/signin`, {
        method:"POST",
        headers:{
            Accept : "application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const signout = next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next();
    }
    return fetch(`${API}/signout`,{
        method:"GET",
    })
    .then(response => console.log("Signed out"))
    .catch(err => console.log(err))
};

export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = () =>{
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    } else{
        return false
    }
};

export const getInvoices = (user, token) =>{
    return fetch(`https://tracker-backend1.herokuapp.com/api/invoice/getallinvoices/${user}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
            Accept:"application/json"
        }
    }).then(res =>{
        return res.json()
    }).catch(err => console.log(err));
};

export const delInvoice = (userId, invoiceId, token)=>{
    return fetch(`https://tracker-backend1.herokuapp.com/api/invoice/${invoiceId}/${userId}`,{
         method:"DELETE",
         headers:{
             "Content-Type":"application/json",
             Authorization:`Bearer ${token}`,
             Accept:"application/json"
         }
     }).then(res=>{
         return res.json();
     }).catch(err=> console.log(err));
 };

 export const getInvoice = (user, token, invoiceId) =>{
    return fetch(`https://tracker-backend1.herokuapp.com/api/invoice/${invoiceId}/${user}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
            Accept:"application/json"
        }
    }).then(res =>{
        return res.json()
    }).catch(err => console.log(err));
};

export const updateInvoice = (userId, invoiceId, token, invoice)=>{
    //console.log(JSON.stringify(invoice));
    return fetch(`https://tracker-backend1.herokuapp.com/api/invoice/${invoiceId}/${userId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
            Accept:"application/json"
        },
        body:JSON.stringify(invoice)
    }).then(res=>{
        return res.json();
    }).catch(err=> console.log(err));
};

export const createInvoice = (userId, token, invoice) => {
    return fetch(`https://tracker-backend1.herokuapp.com/api/invoice/create/${userId}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(invoice)
    }).then(res=>{
        return res.json()
    }).catch(err=>console.log(err));
};

export const getauser = (user, token, invoiceId) =>{
    return fetch(`https://tracker-backend1.herokuapp.com/api/invoice/user/${invoiceId}/${user}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
            Accept:"application/json"
        }
    }).then(res =>{
        return res.json()
    }).catch(err => console.log(err));
};

