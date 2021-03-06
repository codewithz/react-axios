import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config.json';
import http from '../../services/HttpService';

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const apiEnpoint = config.baseUrl + `/customers/customers`;

        async function getCustomers() {
            const result = await http.get(apiEnpoint);
            setCustomers(result.data)

        }
        getCustomers();
    }, [])


    const deleteCustomer=async (event,customerId)=>{
        event.preventDefault();
        alert(customerId);

        const apiEndPoint=config.baseUrl+`/customers/customer/${customerId}`
        try{
            const result=await http.delete(apiEndPoint);
            let updatedCustomers=customers.filter(
                customer=>customer.id!==customerId
            );
            setCustomers(updatedCustomers);
        }
        catch(ex){
          
            if(ex.response && ex.response.status===404){
                alert("This post doesn't exist anymore")
            }
        }
      
      

    }

    const tabRow = () => {
        const tableRows = customers.map((customer, index) => {
            return (
                <tr key={index}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.birthdate}</td>
                    <td>{customer.active ? "Active" : "Inactive"}</td>
                    <td>
                        <button className="btn btn-warning btn-sm">Show</button>
                        &nbsp;
                        <Link
                            className="btn btn-success btn-sm"
                            to={`/customer/${customer.id}/edit`}
                        >
                            Update
                        </Link>
                        &nbsp;
                        <button className="btn btn-danger btn-sm"
                            onClick={e=>deleteCustomer(e,customer.id)}
                        >Delete</button>
                    </td>

                </tr>
            )
        });
        return tableRows;
    }

    return (
        <div>
            <Link className="btn btn-primary"
                to={`/customer/new`}>
                Create New Customer
            </Link>

            <hr />

            <h4>Customer List</h4>
            <table className="table table-bordered table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Birthdate</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers ? tabRow() : null}
                </tbody>
            </table>

        </div>
    )
}
