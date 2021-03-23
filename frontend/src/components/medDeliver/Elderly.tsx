import * as React from 'react';
import { Elderly } from '../../redux/medDeliver/state';
import { Link } from 'react-router-dom';
import moment from 'moment';

export interface IMedicineDeliverProps {
   elderly: Elderly[],
   time:string
}

const Elder:React.FC<IMedicineDeliverProps> = (props) => {
    
    return (
            <>
            {props.elderly.map(elderly=>{
                return(

                    <Link to={`/medicine/distribute/${props.time}/${elderly.elderly_id}`}>
                    <div className={`deliver deliver-container`}>
                        <div>
                            <img src={elderly.image} alt="" />
                        </div>
                        <div style={{
                            color: 'rgb(125, 125, 125)',
                            margin: '10px'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center'
                            }}>
                                <h1>{elderly.name}</h1>
                                <h3
                                    style={{
                                        borderRadius: '50%',
                                        border: '5px solid #7d7d7d',
                                        width: '50px',
                                        height: '50px',
                                        alignItems: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '5px',
                                        color: '#7d7d7d',
                                        fontWeight: 'bold'
                                    }}>{elderly.bed_number}</h3>
                            </div>
                            <h4>{elderly.medicine.length} 款藥物</h4>
                            <div style={{ display: 'flex', paddingTop: '10px', justifyContent: 'space-between' }}>
                                <span>日期：{moment().format('YYYY-MM-DD')}</span>
                                <span>狀態：未派藥</span>
                            </div>
                        </div>
                    </div>
                </Link >

            // <div className="oneElderly">
            // <div className="mediDetails">{elderly.name}</div>
            // <div className="mediDetails">床號：{elderly.bed_number}</div>
            // <div className="medicine"><Med medicine={elderly.medicine}/></div>
            // </div>
            )})
            }
            
            </>
    )
}



export default Elder;