import "./TemperatureRecord.css"
import { connect } from 'react-redux';
import { ClientInfo } from '../../redux/temperatureRecord/state'
import { Table } from 'reactstrap';
import { ThunkDispatch, IRootState } from '../../redux/store';
import * as React from 'react';
import { remoteLoadClient } from '../../redux/temperatureRecord/thunk';
import moment from 'moment';
import { push } from 'connected-react-router';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const { REACT_APP_API_SERVER } = process.env

export interface IClientProps {
    loadClient: () => void,
    push: () => void,
    clients: ClientInfo[]
}

interface IClientState {
    temperatureInput: ClientInfo[];
}


class TemperatureRecord extends React.Component<IClientProps, IClientState> {

    state: IClientState = {
        temperatureInput: []
    }

    async componentDidMount() {
        await this.props.loadClient()
        console.log('hello')
        console.log(this.props.clients)

        const clients = this.props.clients.map((client: any) => {
            return ({
                ...client,
                "temperature_unit": client["temperature_unit"] ? client["temperature_unit"] : "°C"
            })
        })

        this.setState({
            temperatureInput: clients
        })
    }

    private unitChange = (event: React.ChangeEvent<HTMLSelectElement>, field: any, index: number) => {
        const newUnit: any = { ...this.state.temperatureInput[index], "temperature_unit": event.target.value }
        const newUnitArray = this.state.temperatureInput.slice();
        newUnitArray.splice(index, 1, newUnit)

        this.setState({
            temperatureInput: newUnitArray
        })
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>, field: any, index: number) => {
        const newObject: any = Object.assign({}, { ...this.state.temperatureInput[index], [field]: event.target.value })
        const newTemperatureArray = this.state.temperatureInput.slice();
        newTemperatureArray.splice(index, 1, newObject)

        this.setState({
            temperatureInput: newTemperatureArray
        })
    }

    private dataSubmit = async () => {
        console.log(this.state.temperatureInput)
        console.log("contains temperature ?")

        let containsTEMP = true
        for (let item of this.state.temperatureInput) {
            if (item.temperature_data === undefined || item.temperature_unit === undefined) {
                containsTEMP = false
            }
        }
        console.log(this.state.temperatureInput)
        console.log(containsTEMP)
        if (containsTEMP) {

            const dataSubmitted = this.state.temperatureInput.map((people: any) => {
                const newObject =
                {
                    elderly_id: people.id,
                    name: people.name_chi,
                    bed_number: people.bed_number,
                    date: moment().format('YYYY-MM-DD'),
                    time: moment().format('HH:mm:ss'),
                    temperature_data: people.temperature_data,
                    temperature_unit: people.temperature_unit
                }
                return newObject
            })
            console.log("testing")
            console.log(dataSubmitted)
            await fetch(`${REACT_APP_API_SERVER}/user/staff/temperature`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(dataSubmitted)
            });

            this.componentDidMount()
        } else {
            alert('尚未完成體溫量度')
        }

    }

    render() {
        return (
            <div className="temperature-list">
                <div className="temperature-title">
                <Button className="blue-btn hidden"><i className="fas fa-chevron-circle-left"></i> 返回 住客中心</Button>
                <h1><i className="fas fa-temperature-low head-sign"></i>體溫表</h1>
                <Link to="/client"><Button className="blue-btn"><i className="fas fa-chevron-circle-left"></i> 返回 住客中心</Button></Link>
                </div>
                <div className="back-and-date">
                    <div className="date">{moment().format("YYYY-MM-DD")}</div>
                </div>
                {(this.props.clients[0].temperature_data === undefined) ? (
                    <>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th className="topColumn">床號</th>
                                    <th className="topColumn">院友姓名</th>
                                    <th className="topColumn">體溫</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.clients.map((client: ClientInfo, index: number) => {
                                    return (<tr key={index}>
                                        <th className="middleColumn" scope="row">{client.bed_number}</th>
                                        <td className="middleColumn">{client.name_chi}</td>
                                        <td className="middleColumn">
                                            <input type="number" name="temperature_data" onChange={(event) => this.handleChange(event, "temperature_data", index)}></input>
                                            <select onChange={(event) => this.unitChange(event, "temperature_unit", index)}>
                                                <option value="°C">°C</option>
                                                <option value="°F">°F</option>
                                            </select>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </Table>
                        <Button color="primary" onClick={() => this.dataSubmit()} className="submitButton">確定</Button>{' '}
                    </>
                )
                    :
                    (<>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th className="topColumn">床號</th>
                                    <th className="topColumn">院友姓名</th>
                                    <th className="topColumn">體溫</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.clients.map((client: any, index: number) => {
                                    return (<tr key={index}>
                                        <th className="middleColumn" scope="row">{client.bed_number}</th>
                                        <td className="middleColumn">{client.name}</td>
                                        <td className="middleColumn">{client.temperature_data}{client.temperature_unit}
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </Table>

                    </>)
                }

            </div>
        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        clients: state.client.clientName
    }
}

// Thunk
const mapDispatchToProps = (dispatch: ThunkDispatch | Dispatch) => {
    return {
        loadClient: () => (dispatch as ThunkDispatch)(remoteLoadClient()),
        push: () => (dispatch as Dispatch)(push('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemperatureRecord)