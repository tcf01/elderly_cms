import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "../../redux/store";
import moment from "moment";
import { Button, Input } from "reactstrap";
import "./Registration.css";
import { submitRegistration } from "../../redux/clientCentre/actions";
import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";

export interface RegistrationFormat {
    name_chi: string;
    name_eng: string;
    image?: string;
    gender: string;
    birth_date: string;
    id_card_number: string;
    telephone: number | null;
    check_in_date: string;
    address: string;
    past_job: string;
    edu_level: string;
    status: string;
    emergency_contact: {
        name: string;
        telephone: number;
        id_card_number: string;
        relation_with_elderly: string;
    }[];
    file: File | null;
}

interface RegistrationProps {
    submit: (info: RegistrationFormat) => void;
    push: () => void;
}

class RegistrationForm extends React.Component<
    RegistrationProps,
    RegistrationFormat
> {
    constructor(props: RegistrationProps) {
        super(props);
        this.state = {
            name_chi: "",
            name_eng: "",
            gender: "",
            birth_date: "",
            id_card_number: "",
            telephone: 0,
            check_in_date: moment().format("YYYY-MM-DD"),
            address: "",
            past_job: "",
            edu_level: "",
            status: "",
            emergency_contact: [
                {
                    name: "",
                    telephone: 0,
                    id_card_number: "",
                    relation_with_elderly: "",
                },
            ],
            file: null,
        };
    }

    private addContactPeople = () => {
        this.setState({
            emergency_contact: [
                ...this.state.emergency_contact,
                {
                    name: "",
                    telephone: 0,
                    id_card_number: "",
                    relation_with_elderly: "",
                },
            ],
        });
    };

    private deleteContactPeople = (index: number) => {
        const newContactArray = this.state.emergency_contact.slice();
        if (index > 0) {
            newContactArray.splice(index, 1);
            this.setState({
                emergency_contact: newContactArray,
            });
        }
    };

    private handleContactChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        field: any,
        index: number
    ) => {
        const newObject = {
            ...this.state.emergency_contact[index],
            [field]: event.target.value,
        };
        const newContactArray = this.state.emergency_contact.slice();
        newContactArray.splice(index, 1, newObject);

        this.setState({
            emergency_contact: newContactArray,
        });
    };

    private onRadioBtnClick = (
        btnField: keyof RegistrationFormat,
        value: string
    ) => {
        this.setState({
            ...this.state,
            [btnField]: value,
        });
    };

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert("Submitted: ");
        console.log(this.state);
        this.props.submit(this.state);
        this.props.push();
    };

    render() {
        return (
            <div className="registration-wrapper">
                <form name="registration" onSubmit={this.handleSubmit}>
                    <div className="flex">
                        <Button className="blue-btn hidden">
                            <i className="fas fa-chevron-circle-left"></i> ??????
                            ????????????
                        </Button>
                        <h1>
                            <i className="far fa-plus-square head-sign"></i>
                            ???????????????
                        </h1>{" "}
                        <Link to="/client">
                            <Button className="blue-btn reg-btn">
                                <i className="fas fa-chevron-circle-left"></i>{" "}
                                ?????? ????????????
                            </Button>
                        </Link>
                    </div>
                    <div className="details-wrapper registration-form-wrapper">
                        <div className="details-section-head  reg-sec-head">
                            <span className="reg-sec-head">
                                <span className="details-section-number">
                                    1
                                </span>
                                ????????????{" "}
                            </span>{" "}
                        </div>
                        <div>
                            <span className="details-field">???????????????</span>
                            <input
                                type="text"
                                name="name_chi"
                                value={this.state.name_chi}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div>
                            <span className="details-field">???????????????</span>
                            <input
                                type="text"
                                name="name_eng"
                                value={this.state.name_eng}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div>
                            <span className="details-field">???????????????</span>
                            <input
                                type="date"
                                name="birth_date"
                                value={this.state.birth_date}
                                onChange={this.handleChange}
                                min="1900-01-01"
                                max={moment().format("YYYY-MM-DD")}
                                required
                            />
                        </div>
                        <div>
                            <span className="details-field">?????????</span>
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() =>
                                    this.onRadioBtnClick("gender", "M")
                                }
                                active={this.state.gender === "M"}
                            >
                                ???
                            </Button>
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() =>
                                    this.onRadioBtnClick("gender", "F")
                                }
                                active={this.state.gender === "F"}
                            >
                                ???
                            </Button>
                        </div>
                        <div>
                            <span className="details-field">??????????????????</span>
                            <input
                                type="text"
                                name="id_card_number"
                                value={this.state.id_card_number}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div>
                            <span className="details-field">
                                ?????????????????????
                            </span>
                            <input
                                type="date"
                                name="check_in_date"
                                value={this.state.check_in_date}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="details-section-head reg-sec-head">
                            <span className="reg-sec-head">
                                <span className="details-section-number">
                                    2
                                </span>
                                ???????????????
                            </span>
                        </div>
                        {this.state.emergency_contact.map((people, index) => {
                            return (
                                <div key={index}>
                                    <div>
                                        <span className="details-field">
                                            ???????????????({index + 1})???
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={(event) =>
                                                this.handleContactChange(
                                                    event,
                                                    "name",
                                                    index
                                                )
                                            }
                                        />
                                        {index > 0 && (
                                            <Button
                                                onClick={() =>
                                                    this.deleteContactPeople(
                                                        index
                                                    )
                                                }
                                                color="danger"
                                            >
                                                -
                                            </Button>
                                        )}
                                    </div>
                                    <div>
                                        <span className="details-field">
                                            ???????????????
                                        </span>
                                        <input
                                            type="number"
                                            name="telephone"
                                            onChange={(event) =>
                                                this.handleContactChange(
                                                    event,
                                                    "telephone",
                                                    index
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <span className="details-field">
                                            ??????????????????
                                        </span>
                                        <input
                                            type="text"
                                            name="id_card_number"
                                            onChange={(event) =>
                                                this.handleContactChange(
                                                    event,
                                                    "id_card_number",
                                                    index
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <span className="details-field">
                                            ??????????????????
                                        </span>
                                        <input
                                            type="text"
                                            name="relation_with_elderly"
                                            onChange={(event) =>
                                                this.handleContactChange(
                                                    event,
                                                    "relation_with_elderly",
                                                    index
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        <div className="registration-add-contact">
                            <Button
                                color="danger"
                                onClick={() => this.addContactPeople()}
                            >
                                +
                            </Button>
                        </div>
                        <div className="details-section-head">
                            <span className="reg-sec-head">
                                <span className="details-section-number">
                                    3
                                </span>
                                ??????????????????
                            </span>
                        </div>
                        <div>
                            <span className="details-field">???????????????</span>
                            <input
                                type="number"
                                name="telephone"
                                value={this.state.telephone || ""}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div>
                            <span className="details-field">???????????????</span>
                            <input
                                type="text"
                                name="address"
                                value={this.state.address}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div>
                            <span className="details-field">
                                ?????????????????????
                            </span>
                            <input
                                type="text"
                                name="past_job"
                                value={this.state.past_job}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div>
                            <span className="details-field">???????????????</span>
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() =>
                                    this.onRadioBtnClick(
                                        "edu_level",
                                        "noEducation"
                                    )
                                }
                                active={this.state.edu_level === "noEducation"}
                            >
                                ????????????
                            </Button>
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() =>
                                    this.onRadioBtnClick(
                                        "edu_level",
                                        "canReadNewspaper"
                                    )
                                }
                                active={
                                    this.state.edu_level === "canReadNewspaper"
                                }
                            >
                                ???????????????????????????
                            </Button>
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() =>
                                    this.onRadioBtnClick("edu_level", "primary")
                                }
                                active={this.state.edu_level === "primary"}
                            >
                                ??????
                            </Button>
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() =>
                                    this.onRadioBtnClick(
                                        "edu_level",
                                        "highSchoolOrBelow"
                                    )
                                }
                                active={this.state.edu_level === "secondary"}
                            >
                                ??????
                            </Button>
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() =>
                                    this.onRadioBtnClick(
                                        "edu_level",
                                        "university"
                                    )
                                }
                                active={this.state.edu_level === "university"}
                            >
                                ??????
                            </Button>
                        </div>
                        <div>
                            <span className="details-field">???????????????</span>
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() =>
                                    this.onRadioBtnClick("status", "single")
                                }
                                active={this.state.status === "single"}
                            >
                                ??????
                            </Button>
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() =>
                                    this.onRadioBtnClick("status", "married")
                                }
                                active={this.state.status === "married"}
                            >
                                ??????
                            </Button>
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() =>
                                    this.onRadioBtnClick("status", "separate")
                                }
                                active={this.state.status === "separate"}
                            >
                                ??????
                            </Button>
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() =>
                                    this.onRadioBtnClick("status", "divorce")
                                }
                                active={this.state.status === "divorce"}
                            >
                                ??????
                            </Button>
                            <Button
                                size="lg"
                                color="primary"
                                onClick={() =>
                                    this.onRadioBtnClick("status", "widow")
                                }
                                active={this.state.status === "widow"}
                            >
                                ??????
                            </Button>
                        </div>
                        <div>
                            <span className="details-field">
                                ?????????????????????
                            </span>
                            <label className="details-upload-file">
                                <i className="far fa-image fa-2x"></i>
                                <Input
                                    type="file"
                                    name="elderly_profile_pic"
                                    onChange={(e) =>
                                        this.handleFileOnChange(
                                            e.target.files as FileList
                                        )
                                    }
                                />
                                {this.state.file
                                    ? "?????????????????????"
                                    : "???????????????"}
                            </label>
                        </div>
                        <div>
                            <input type="submit" value="??????" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    public handleFileOnChange = (files: FileList) => {
        this.setState({
            file: files[0],
        });
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch | Dispatch) => {
    return {
        submit: (info: RegistrationFormat) =>
            (dispatch as ThunkDispatch)(submitRegistration(info)),
        push: () => (dispatch as Dispatch)(push("/contract")),
    };
};

export default connect(() => ({}), mapDispatchToProps)(RegistrationForm);
