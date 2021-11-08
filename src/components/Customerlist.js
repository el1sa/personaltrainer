import React, { useState, useEffect } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }, []);

    const columns = [
        {field: 'firstname'},
        {field: 'lastname'},
        {field: 'streetaddress'},
        {field: 'postcode'},
        {field: 'city'},
        {field: 'email'},
        {field: 'phone'}
        
    ]

    
    return(
        <div className="ag-theme-material" style={{height: 400, width: '80%'}}>
        <AgGridReact 
            rowData={customers}
            columnsDefs={columns}
        />
        </div>
    );
}

export default Customerlist;