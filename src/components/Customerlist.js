import React, { useState, useEffect } from 'react';
import {AgGridReact} from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import { Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';


function Customerlist() {
    const [customers, setCustomers] = useState([]);

    const [trainings, setTrainings] = useState([]);

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

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
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

    const editCustomer = (url, updateCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(updateCustomer)
        })
        .then(_ => {
            setMsg("Customer updated");
            setOpen(true);
            fetchCustomers()
        })
        .catch(err => console.log(err))
    }

    const addTraining = training => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(training)
        }
        )
        .then(_ => fetchTrainings())
        .catch(err => console.error(err))
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
            field: 'links.0.href', 
            cellRendererFramework: params => <Button variant="outlined" startIcon={<DeleteIcon />} size="small" color="error" onClick={() => deleteCustomer(params.value)}>Delete</Button>
        },
        {
            headerName: '',
            sortable: false, 
            filter: false,
            width: 120,
            field: 'links.0.href',
            cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} customer={params} />
        },
        {
            headerName: '',
            sortable: false, 
            filter: false,
            width: 120,
            field: 'links.0.href',
            cellRendererFramework: params => <AddTraining addTraining={addTraining} training={params} />
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