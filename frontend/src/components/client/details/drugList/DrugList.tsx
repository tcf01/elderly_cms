import React from "react";
import { connect } from "react-redux";
import { IRootState, ThunkDispatch } from "../../../../redux/store";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
} from "reactstrap";
import DrugListInDB from "./DrugListInDB";

import DrugListInDBTableForm from "./DrugListInDBTableForm";
import { Time, DrugFormat } from "../../../../interface";
import { addDrugToDB } from "../../../../redux/drugList/thunk";

// const { REACT_APP_API_SERVER } = process.env

interface IClientCardProps {
    addDrugToDB: (drugInfo: DrugFormat) => void;

    // getAllDrugNames:()=>void,

    id: number;
}

interface IClientCardState {
    elderly_id: number;
    drug_name: string;
    dose: string;
    times_per_day: string | number | undefined;
    start_date: undefined | string;
    end_date: undefined | string;
    depend_on_need: boolean;
    authorized_hospital: string;
    reason_of_taking: undefined | string;
    drugInterval: Time[];
    isOfficial: boolean;
    file: File | undefined;
    modal: boolean;
}

class DrugList extends React.Component<IClientCardProps, IClientCardState> {
    constructor(props: IClientCardProps) {
        super(props);
        this.state = {
            elderly_id: this.props.id,
            drug_name: "",
            dose: "",
            times_per_day: "1",
            start_date: undefined,
            end_date: undefined,
            depend_on_need: false,
            authorized_hospital: "",
            reason_of_taking: "",
            drugInterval: [{ time: "" }],
            isOfficial: true,
            file: undefined,
            modal: false,
        };
    }

    componentDidMount() {
        // this.props.getAllDrugNames();
        console.log(this.state);
    }

    private drugInterval = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.handleFormChange(event);

        const numberOfInputBox = parseInt(event.target.value);
        const inputBoxDifference =
            numberOfInputBox - this.state.drugInterval.length;

        let newInterval = this.state.drugInterval.slice();
        if (inputBoxDifference > 0) {
            for (let i = 0; i < inputBoxDifference; i++) {
                newInterval.push({ time: "" });
            }
        } else {
            console.log("inputBoxDifference");
            for (let i = inputBoxDifference; i < 0; i++) {
                newInterval.pop();
            }
        }
        this.setState({
            drugInterval: newInterval,
        });
    };

    private handleDrugTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedInterval: Time[] = this.state.drugInterval.slice();
        updatedInterval.splice(index, 1, { time: event.target.value });
        this.setState({
            drugInterval: updatedInterval,
        });
    };

    private handleFormChange = (event: React.ChangeEvent<any>) => {
        const target = event.target;
        const name: keyof IClientCardState = target.name;
        const value =
            target.type === "checkbox" ? !this.state[name] : target.value;
        console.log(value);
        console.log(name);
        this.setState({
            ...this.state,
            [name]: value,
        });
    };

    public handleFileOnChange = (files: FileList) => {
        this.setState({
            file: files[0],
        });
    };

    private handleSubmit = async () => {
        const drugToBeAdded = { ...this.state };
        delete drugToBeAdded.modal;

        console.log("drugToBeAdded: ", drugToBeAdded);
        this.props.addDrugToDB(drugToBeAdded);
    };

    private toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    render() {
        return (
            <div className="drug-list-wrapper">
                <Button
                    className="drug-list-add-btn"
                    color="info"
                    onClick={this.toggle}
                >
                    <i className="fas fa-pills fa-2x"></i> + ????????????
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        
                        <i className="fas fa-pills fa-2x"></i> ????????????
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <span className="modal-field">?????????</span>
                            <input
                                name="drug_name"
                                type="text"
                                value={this.state.drug_name}
                                onChange={this.handleFormChange}
                                placeholder="?????????????????????"
                            />
                        </div>
                        <div>
                            <span className="modal-field">???????????????</span>
                            <input
                                name="depend_on_need"
                                type="checkbox"
                                checked={this.state.depend_on_need}
                                onChange={this.handleFormChange}
                            />
                        </div>
                        <div>
                            <span className="modal-field">??????????????????</span>
                            <input
                                name="isOfficial"
                                type="checkbox"
                                checked={!this.state.isOfficial}
                                onChange={this.handleFormChange}
                            />
                        </div>
                        <div>
                            <span className="modal-field">?????????</span>
                            <select
                                name="times_per_day"
                                value={this.state.times_per_day}
                                onChange={this.drugInterval}
                            >
                                <option value="1">??????1???</option>
                                <option value="2">??????2???</option>
                                <option value="3">??????3???</option>
                                <option value="4">??????4???</option>
                            </select>
                        </div>

                        {this.state.drugInterval.map((interval, index) => {
                            return (
                                <div key={index}>
                                    <div>
                                        <span className="modal-field"></span>
                                        <input
                                            type="number"
                                            value={interval.time}
                                            onChange={(event) =>
                                                this.handleDrugTimeChange(
                                                    event,
                                                    index
                                                )
                                            }
                                            placeholder="?????????????????????"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        <div>
                            <span className="modal-field">?????????</span>
                            <input
                                name="dose"
                                type="text"
                                value={this.state.dose}
                                onChange={this.handleFormChange}
                                placeholder="??????????????????"
                            />
                        </div>

                        <div>
                            <span className="modal-field">???????????????</span>
                            <input
                                type="date"
                                name="start_date"
                                value={this.state.start_date}
                                onChange={this.handleFormChange}
                            />
                        </div>
                        <div>
                            <span className="modal-field">???????????????</span>
                            <input
                                type="date"
                                name="end_date"
                                value={this.state.end_date}
                                onChange={this.handleFormChange}
                            />
                        </div>
                        <div>
                            <span className="modal-field">?????????????????????</span>
                            <input
                                type="text"
                                name="authorized_hospital"
                                value={this.state.authorized_hospital}
                                onChange={this.handleFormChange}
                                placeholder="?????????????????????"
                            />
                        </div>
                        <div>
                            <span className="modal-field">
                                ????????????/???????????????
                            </span>
                            <input
                                type="text"
                                name="reason_of_taking"
                                value={this.state.reason_of_taking}
                                onChange={this.handleFormChange}
                                placeholder="*??????????????????"
                            />
                        </div>
                        <div>
                            <span className="modal-field">?????????????????????</span>
                            <label className="modal-upload-file">
                                <Input
                                    type="file"
                                    name="new_drug_pic"
                                    className="modal-upload-file"
                                    onChange={(e) => {
                                        return this.handleFileOnChange(
                                            e.target.files as FileList
                                        );
                                    }}
                                />
                                <i className="far fa-image fa-2x"></i>
                                {this.state.file
                                    ? "????????????1?????????"
                                    : "?????????????????????"}
                            </label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmit}>
                            ??????
                        </Button>
                        <Button color="secondary" onClick={this.toggle}>
                            ??????
                        </Button>
                    </ModalFooter>
                </Modal>

                <div className="drug-list">
                    <DrugListInDB id={this.props.id} />
                    <DrugListInDBTableForm id={this.props.id} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState) => {};

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        addDrugToDB: (drugInfo: DrugFormat) => dispatch(addDrugToDB(drugInfo)),
        // getAllDrugNames: ()=>dispatch(getAllDrugNames())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrugList);
