import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    const [open, setOpen] = React.useState(false);

    const [msg, setMsg] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const deleteTraining = url => {
        if (window.confirm('Sure you want to delete?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchTrainings()
                        setMsg("Training deleted");
                        setOpen(true)
                    }
                    else
                        alert('Failed to delete')
                })
                .catch(err => console.error(err))
        }
    }

    const columns = [
        {
            field: 'date', sortable: true, filter: true, cellRenderer: (data) => {
                return moment(data.createdAt).format('DD/MM/YYYY');
            }
        },
        { field: 'duration', sortable: true, filter: true, width: 120 },
        { field: 'activity', sortable: true, filter: true },
        {
            headerName: 'Customer',
            editable: true,
            valueGetter: 'data.customer.firstname + " " + data.customer.lastname',
            valueSetter:
                // an expression can span multiple lines!!!
                `var nameSplit = newValue.split(" ");
            var newFirstName = nameSplit[0];
            var newLastName = nameSplit[1];
            if (data.firstName !== newFirstName || data.lastName !== newLastName) {  
                data.firstName = newFirstName;  
                data.lastName = newLastName;  
            return true;
            } else {  
            return false;
            }`,
            sortable: true, filter: true
        },
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 120,
            field: 'id',
            cellRendererFramework: params => <Button variant="outlined" startIcon={<DeleteIcon />} size="small" color="error" onClick={() => deleteTraining(params.value)}>Delete</Button>
        }
    ]


    return (
        <div className="ag-theme-material" style={{ marginTop: 20, height: 600, width: '80%', margin: 'auto' }}>
            <AgGridReact
                rowData={trainings}
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
    );
}

export default Traininglist;