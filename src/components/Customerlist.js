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
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true, width: 120},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true}
        
    ]

    
    return(
        <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: '80%', margin: 'auto'}}>
        <AgGridReact 
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            suppressCellSelection={true}
        />
        </div>
    );
}

export default Customerlist;