import React, { useState, useEffect } from 'react'
import http from '../../services/HttpService';

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
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                />
                <label>Phone:</label>
                <input
                    type="number"
                    name="phone"
                    className="form-control"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                />
                <label>Birthdate:</label>
                <input
                    type="text"
                    name="birthdate"
                    className="form-control"
                    value={customer.birthdate}
                    onChange={(e) => setCustomer({ ...customer, birthdate: e.target.value })}
                />
                <label>Active:</label>
                <input
                    type="text"
                    name="active"
                    className="form-control"
                    value={customer.active}
                    onChange={(e) => setCustomer({ ...customer, active: e.target.value })}
                />

                <button className="btn btn-primary btn-sm" onClick={submitForm}>Submit</button>


            </form>
        );

        return customerForm;
    }

    const submitForm=async ()=>{

            if(customer.id){
                const apiEndPoint=baseUrl+`/customers/customer/${customer.id}`;
                const response=await http.put(apiEndPoint,customer);
                console.log(response.data);
            }
            else{
                const apiEndPoint=baseUrl+`/customers/customer`;
                const response=await http.post(apiEndPoint,customer);
                console.log(response.data);
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
