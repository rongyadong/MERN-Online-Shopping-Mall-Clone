import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse;

const continents = [
    {
        "_id": 1,
        "name": "Australia"
    },
    {
        "_id": 2,
        "name": "Europe"
    },
    {
        "_id": 3,
        "name": "Asia"
    },
    {
        "_id": 4,
        "name": "North America"
    },
    {
        "_id": 5,
        "name": "South America"
    },
    {
        "_id": 6,
        "name": "Africa"
    },
    {
        "_id": 7,
        "name": "Antarctica"
    }
];

const CheckBox = props => {

    const [checked, setChecked] = useState([]);

    const handleToggle = (value) => {

        let newChecked = [...checked];

        newChecked.indexOf(value) === -1 ? newChecked = [...newChecked, value] : newChecked = newChecked.filter(item => item !== value);

        setChecked(newChecked);
        // // update this checked information into Parent Component
        props.handleFilters(newChecked);
    };

    return (
        <div>
            <Collapse defaultActiveKey={[0]}>
                <Panel key='1' header='Continents'>
                    {continents.map((item,index)=>(
                        <React.Fragment key={item._id}>
                            <Checkbox
                                onClick={()=>{handleToggle(item._id)}}
                                type='checkbox'
                                checked={checked.indexOf(item._id) === -1 ? false : true}
                            />
                            <span>{item.name}</span>
                        </React.Fragment>
                    ))}
                </Panel>
            </Collapse>
        </div>
    )
};

export default CheckBox;