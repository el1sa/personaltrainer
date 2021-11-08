import React, { useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab  from '@mui/material/Tab';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';

function TabApp() {

    const [value, setValue] = useState('Customerlist');

    const handleChange= ( event, value) => {
        setValue(value);
    };

    return(
    <div>
        <Tabs value={value} onChange={handleChange}>
            <Tab value="Customerlist" label= 'Customers'/>
            <Tab value="Traininglist" label='Trainings'/>
        </Tabs>
        {value === 'Customerlist' && <div><Customerlist /></div>}
        {value === 'Traininglist' && <div><Traininglist /></div>}
    </div>
    );
}
    export default TabApp;