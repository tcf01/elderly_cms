import React from 'react';
import moment from 'moment';

const BackendData: React.FC<{temperature:any[]}> = (props) => {
    return (
        <>{props.temperature.map(item=>(
            <tr>
                <th scope="row">{moment(item.date).format('YYYY-MM-DD')}</th>
                <td>{moment(item.time,'h:mm A').format('h:mm A')}</td>
                <td>{item.temperature_data}{item.temperature_unit}</td>
                <td>Otto</td>
            </tr>))
        }
        </>
    )
}

export default BackendData;