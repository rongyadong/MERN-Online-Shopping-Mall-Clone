import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

const RadioBox = props => {
    const [selected, setSelected] = useState('0');

    const renderRadioBox = props.filterList && props.filterList.map((item) => (
        <Radio key={item._id} value={`${item._id}`}>{item.name}</Radio>
    ));

    const handleClick = e => {
        setSelected(e.target.value);
        props.handleFilters(e.target.value);
    };

    return (
        <div>
            <Collapse defaultActiveKey={[0]}>
                <Panel key='1' header={'Price'}>
                    <Radio.Group
                        onChange={handleClick}
                        value={selected}>
                        {renderRadioBox}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
};

export default RadioBox;

