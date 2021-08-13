import React, { useState, useEffect } from 'react'
import http from '../../services/HttpService';
import { toast } from 'react-toastify';
import Joi, { errors } from 'joi-browser';

export default function CustomerForm(props) {
    const baseUrl=`http://localhost:8088/api/v1`;
    const [customer, setCustomer] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        birthdate: "",
        active: ""
    });

    const [errors,setErrors]=useState({});

    const schema={
        name: Joi.string().required().label("Name"),
        email:Joi.string().email().required().label("Email"),
        phone: Joi.number().required().label("Phone"),
        birthdate:Joi.date().required().label("Birthdate"),
        active:Joi.boolean().required().label("Active")
    }

    useEffect(()=>{
        async function fetchCustomer(){
        const customerId=props.match.params.id;
        if(customerId){
            const apiEndPoint=baseUrl+`/customers/customer/${customerId}`
            const result=await http.get(apiEndPoint);
            setCustomer(result.data);
        }
    }
        fetchCustomer();
    },[])


    const getCustomerForm = () => {
      
        const customerForm = (
            <form>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={customer.name}
                    onChange={(e) =>handleChange(e)}
                />
                {errors.name && <div className="alert alert-danger alert-sm">{errors.name}</div>}
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={customer.email}
                    onChange={(e) => handleChange(e)}
                />
                {errors.email && <div className="alert alert-danger alert-sm">{errors.email}</div>}
                <label>Phone:</label>
                <input
                    type="number"
                    name="phone"
                    className="form-control"
                    value={""+customer.phone}
                    onChange={(e) => handleChange(e)}
                />
                {errors.phone && <div className="alert alert-danger alert-sm">{errors.phone}</div>}
                <label>Birthdate:</label>
                <input
                    type="date"
                    name="birthdate"
                    className="form-control"
                    value={customer.birthdate}
                    //onChange={(e) => setCustomer({ ...customer, birthdate: e.target.value })}
                    onChange={(e) => handleChange(e)}
                />
                {errors.birthdate && <div className="alert alert-danger alert-sm">{errors.birthdate}</div>}
                <label>Active:</label>
                <input
                    type="text"
                    name="active"
                    className="form-control"
                    value={""+customer.active}
                    onChange={(e) => handleChange(e)}
                />
                {errors.active && <div className="alert alert-danger alert-sm">{errors.active}</div>}

                <button 
                className="btn btn-primary btn-sm" 
                onClick={(event)=>submitForm(event)}>
                    Submit
                </button>


            </form>
        );

        return customerForm;
    }

    const handleChange=(event)=>{
        const {name,value}=event.target;

        let errorData={...errors};
        const errorMessage=validateProperty(event);

        if(errorMessage){
            errorData[name]=errorMessage;
        }
        else{
            delete errorData[name];
        }

        let customerData={...customer};
        customerData[name]=value;
        setCustomer(customerData);
        setErrors(errorData);
    }

    const validateForm=()=>{
        const result=Joi.validate(customer,schema,{abortEarly:false});
        console.log(result);

        const {error}=result;
         if(!error){
             return null;
         }
         else{
             const errorData={};
             for(let item of error.details){
                 const name=item.path[0];
                 if(name!=="id"){
                 errorData[item.path[0]]=item.message;
                 }
             }
             setErrors(errorData);
             return errorData;
         }
    }

    const validateProperty=(event)=>{

        const {name,value}=event.target;
        const obj={[name]:value};

        const subSchema={[name]:schema[name]};

        const result=Joi.validate(obj,subSchema);
        const {error}=result;
        return error ? error.details[0].message:null;

    }

    const submitForm=async (event)=>{
            event.preventDefault();
           const errors=validateForm();
            console.log(errors);

        if(Object.keys(errors).length===0){
            if(customer.id){
                const apiEndPoint=baseUrl+`/customers/customer/${customer.id}`;
                const response=await http.put(apiEndPoint,customer);
                console.log(response.data);
                toast.success("Customer Updated Successfully")
                setCustomer({
                    id: "",
                    name: "",
                    email: "",
                    phone: "",
                    birthdate: "",
                    active: ""
                });
            }
            else{
                const apiEndPoint=baseUrl+`/customers/customer`;
                const response=await http.post(apiEndPoint,customer);
                console.log(response.data);
                toast.success("Customer Added Successfully");
                setCustomer({
                    id: "",
                    name: "",
                    email: "",
                    phone: "",
                    birthdate: "",
                    active: ""
                });
            }
        }
        else{
            toast.warning("Please fill the valid details and submit");
        }
        
    }

    return (
        <div>
            <div className="row">
                <div className='col-md-6'>
                    {getCustomerForm()}
                </div>
            </div>
        </div>
    )
}
