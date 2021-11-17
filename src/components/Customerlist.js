import React, { useState, useEffect } from 'react';
import {AgGridReact} from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import { Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


function Customerlist() {
    const [customers, setCustomers] = useState([]);

    const [open, setOpen] = React.useState(false);

    const [msg, setMsg] = useState('');

    const handleClose = () => {
        setOpen(false);
      };    

    useEffect(() => {
        fetchCustomers();
     }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const addCustomer = customer => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(customer)
        }
        )
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
    }

    const deleteCustomer = url => {
        if (window.confirm('Sure you want to delete?')) {
            fetch(url, {method: 'DELETE'})
            .then(response => { 
        if(response.ok) {
            fetchCustomers()
            setMsg("Customer deleted");
            setOpen(true)
        }
        else
            alert('Failed to delete')
        })
            .catch(err => console.error(err))
        }
    }

    const columns = [
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true, width: 120},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            sortable: false, 
            filter: false,
            width: 120,
            field: '_links.self.href', 
            cellRendererFramework: params => <Button variant="outlined" startIcon={<DeleteIcon />} size="small" color="error" onClick={() => deleteCustomer(params.value)}>Delete</Button>
        }
        
    ]

    
    return(
        <div>
            <AddCustomer addCustomer={addCustomer}/>
        <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: '80%', margin: 'auto'}}>
        <AgGridReact 
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            suppressCellSelection={true}
        />
        <Snackbar 
            open={open}
            message={msg}
            autoHideDuration={3000}
            onClose={handleClose}
        />
        </div>
        </div>
    );
}

export default Customerlist;