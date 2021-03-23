import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import moment from "moment";

import "./ClientCard.css";
import { IRootState } from "../../redux/store";
import { IPerMedicineRecordCard } from "../../redux/medicine/state";


// export interface IMedicineClientCardProps {

//     elderlyDrugRecords:
//     elderly_id: number,
//     elderly_image: string,
//     elderly_chi_name: string,
//     elderly_eng_name: string,
//     elderly_bed_number: number,
//     drug_basic_info: [{
//         drug_record_id: number,
//         name: string,
//         dose: string,
//         image: string,
//         times_per_day: number,
//         start_date: string
//         end_date: string,
//         depend_on_need: boolean,
//         authorized_hospital: null,
//         isOfficial: boolean,
//         reason_of_taking: string,
//         drug_details: [{
//             drug_details_id: number,
//             have_drug_time: string,
//             status_id: number,
//             remark: string
//         }]
//     }]
// }

interface IMedicineClientCardState {
    recent_stage: string;
}

interface IMedicineStage {
    detail_id: number;
    status_id: number;
}

export class MedicineClientCard extends React.Component<
    IPerMedicineRecordCard,
    IMedicineClientCardState
> {
    private readonly pathFormer = {
        未執藥: "pack",
        未核藥: "verify",
        未派藥: "deliver",
    };

    constructor(props: IPerMedicineRecordCard) {
        super(props);
        this.state = {
            recent_stage: "未執藥",
        };
    }

    public componentDidMount = () => {
        this.recentDrugStage();
    };

    private recentDrugStage = () => {
        const stage = {
            1: "未執藥",
            2: "未核藥",
            3: "未派藥",
        };
        const recent_drug_stage = [] as any;
        this.props.drug_basic_info.map((drug_basic_info) => {
            return drug_basic_info.drug_details.map((drug_details) => {
                return recent_drug_stage.push({
                    drug_detail_id: drug_details.drug_details_id,
                    status_id: drug_details.status_id,
                });
            });
        });

        const recent_drug_stage_status_id = recent_drug_stage.reduce(
            (acc: Array<number>, data: IMedicineStage) => {
                acc.push(data.status_id);
                return acc;
            },
            []
        );

        console.log(
            this.props.elderly_chi_name,
            this.props.drug_basic_info,
            recent_drug_stage_status_id,
            Math.min(...recent_drug_stage_status_id)
        );
        const min_status_id = Math.min(...recent_drug_stage_status_id);
        this.setState({ recent_stage: stage[min_status_id as 1 | 2 | 3] });
    };

    public render = () => {
        console.log("recent_stage", this.state.recent_stage);
        const type = this.pathFormer[
            this.state.recent_stage as "未執藥" | "未核藥" | "未派藥"
        ];
        return (
            <Link to={`/medicine/${type}/${this.props.elderly_id}`}>
                <div className={`${type} card-container`}>
                    <div className="client-card-img">
                        <img src={this.props.elderly_image} alt=""/>
                    </div>
                    <div
                        style={{
                            color: "rgb(125, 125, 125)",
                            margin: "10px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <h1>{this.props.elderly_chi_name}</h1>
                            <h3
                                style={{
                                    borderRadius: "50%",
                                    border: "5px solid #7d7d7d",
                                    width: "50px",
                                    height: "50px",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "5px",
                                    color: "#7d7d7d",
                                    fontWeight: "bold",
                                }}
                            >
                                {this.props.elderly_bed_number}
                            </h3>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                paddingTop: "10px",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>日期：{moment().format("YYYY-MM-DD")}</span>
                            <span>狀態：{this.state.recent_stage}</span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    };
}

const mapStateToProps = (state: IRootState) => ({
    elderlyDrugRecords: state.medicine.elderlyDrugRecords,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

connect(mapStateToProps, mapDispatchToProps)(MedicineClientCard);
