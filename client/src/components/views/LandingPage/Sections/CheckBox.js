import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse;

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
                    {props.filterList.map((item,index)=>(
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