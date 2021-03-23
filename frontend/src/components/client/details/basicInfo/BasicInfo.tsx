import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import moment from "moment";

import GenericUserIcon from "../../../../assets/img/generic-user-icon.png";
import { IRootState, ThunkDispatch } from "../../../../redux/store";
import {
    fetchBasicInfo,
    saveEditedInfo,
    handleInfoChange,
} from "../../../../redux/basicInfo/actions";
import { BasicInfoFormat, Contact } from "../../../../redux/basicInfo/state";
import EmergencyContacts from "./EmergencyContacts";

interface IBasicInfoProps {
    //from react parent element
    id: number;

    //ThunkDispatch
    fetchBasicInfo: (elderlyID: number) => void;
    basicInfo: BasicInfoFormat;
    contacts: Contact[];

    handleInfoChange: (
        basicInfo: any,
        key: string,
        value: string | number
    ) => void;
    saveEditedInfo: (
        updatedInfo: BasicInfoFormat,
        updatedContacts: Contact[]
    ) => void;
}

interface IBasicInfoState {
    //Edit Buttons
    editBtnState: string;
    isEditing: boolean;
}

class BasicInfo extends React.Component<IBasicInfoProps, IBasicInfoState> {
    constructor(props: IBasicInfoProps) {
        super(props);
        this.state = {
            //Edit Button
            editBtnState: "更改",
            isEditing: false,
        };
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.props.fetchBasicInfo(this.props.id);
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        this.props.handleInfoChange(this.props.basicInfo, name, value);
    };

    private onRadioBtnClick = (btnField: string, value: string) => {
        this.props.handleInfoChange(this.props.basicInfo, btnField, value);
    };

    private editBtnState = () => {
        if (this.state.isEditing) {
            this.props.saveEditedInfo(
                this.props.basicInfo,
                this.props.contacts
            );
        }

        this.setState({
            ...this.state,
            editBtnState: this.state.editBtnState === "更改" ? "儲存" : "更改",
            isEditing: !this.state.isEditing,
        });
    };

    render() {
        let status = "";
        let gender = "";
        let edu_level = "";

        // const eduLevel = {
        //   "noEducation": "未受教育",
        //   "canReadNewspaper": "未受教育，但可閱報",
        //   "primary": "小學",
        //   "secondary": "中學",
        //   "university": "大學"
        // }
        // this.props.basicInfo.edu_level
        // const eduValue = eduLevel[this.props.basicInfo.edu_level]

        if (this.props.basicInfo !== null) {
            switch (this.props.basicInfo.edu_level) {
                case "noEducation":
                    edu_level = "未受教育";
                    break;
                case "canReadNewspaper":
                    edu_level = "未受教育，但可閱報";
                    break;
                case "primary":
                    edu_level = "小學";
                    break;
                case "secondary":
                    edu_level = "中學";
                    break;
                case "university":
                    edu_level = "大學";
                    break;
                default:
                    edu_level = "";
            }

            switch (this.props.basicInfo.status) {
                case "single":
                    status = "單身";
                    break;
                case "married":
                    status = "已婚";
                    break;
                case "separate":
                    status = "分居";
                    break;
                case "divorce":
                    status = "離婚";
                    break;
                case "widow":
                    status = "鰥寡";
                    break;
                default:
                    status = "";
            }

            switch (this.props.basicInfo.gender) {
                case "M":
                    gender = "男";
                    break;
                case "F":
                    gender = "女";
                    break;
                default:
                    gender = "";
            }
        }

        return (
            <div>
                {!this.state.isEditing
                    ? this.props.basicInfo && (
                          <div className="basic-info-wrapper">
                              <div className="basic-info-left">
                                  <div className="details-picture">
                                      <img
                                          alt=""
                                          src={`${
                                              this.props.basicInfo.image ||
                                              GenericUserIcon
                                          }`}
                                      />
                                  </div>
                              </div>

                              <div className="details-wrapper">
                                  <div>
                                      <div className="details-section">
                                          <div className="details-section-head">
                                              <span>
                                                  <span className="details-section-number">
                                                      1
                                                  </span>
                                                  基本資料
                                              </span>
                                              <Button
                                                  className="details-edit-btn blue-btn"
                                                  onClick={this.editBtnState}
                                              >
                                                  <i className="far fa-edit"></i>
                                                  {" " +
                                                      this.state.editBtnState}
                                              </Button>
                                          </div>
                                          <div className="details-name">
                                              <span className="details-field">
                                                  住客姓名：
                                              </span>
                                              {this.props.basicInfo.name_chi}
                                          </div>
                                          <div className="details-eng-name">
                                              <span className="details-field">
                                                  英文姓名：
                                              </span>
                                              {this.props.basicInfo.name_eng}
                                          </div>
                                          <div className="details-bed-number">
                                              <span className="details-field">
                                                  床號：
                                              </span>
                                              {this.props.basicInfo
                                                  .bed_number || "未設定"}
                                          </div>
                                          <div className="details-contact1">
                                              <span className="details-field">
                                                  出生日期：
                                              </span>
                                              {this.props.basicInfo.birth_date}
                                          </div>
                                          <div className="details-age">
                                              <span className="details-field">
                                                  年齡：
                                              </span>
                                              {moment().diff(
                                                  this.props.basicInfo
                                                      .birth_date,
                                                  "years",
                                                  false
                                              )}
                                          </div>
                                          <div className="details-gender">
                                              <span className="details-field">
                                                  性別：
                                              </span>
                                              {gender}
                                          </div>
                                          <div className="details-contact1">
                                              <span className="details-field">
                                                  身份證號碼：
                                              </span>
                                              {
                                                  this.props.basicInfo
                                                      .id_card_number
                                              }
                                          </div>
                                          <div className="details-contact1">
                                              <span className="details-field">
                                                  入住本院日期：
                                              </span>
                                              {
                                                  this.props.basicInfo
                                                      .check_in_date
                                              }
                                          </div>
                                          <div className="details-contact1">
                                              <span className="details-field">
                                                  退院日期：
                                              </span>
                                              {
                                                  this.props.basicInfo
                                                      .check_out_date
                                              }
                                          </div>
                                      </div>
                                      <div className="details-section">
                                          <div className="details-section-head">
                                              <span>
                                                  <span className="details-section-number">
                                                      2
                                                  </span>
                                                  聯絡人資料
                                              </span>
                                          </div>
                                          <EmergencyContacts
                                              isEditing={this.state.isEditing}
                                              id={this.props.id}
                                          />
                                      </div>

                                      <div className="details-section">
                                          <div className="details-section-head">
                                              <span>
                                                  <span className="details-section-number">
                                                      3
                                                  </span>
                                                  住客詳細資料
                                              </span>
                                          </div>
                                          <div className="details-contact1">
                                              <span className="details-field">
                                                  通訊電話：
                                              </span>
                                              {this.props.basicInfo.telephone}
                                          </div>
                                          <div className="details-contact1">
                                              <span className="details-field">
                                                  通訊地址：
                                              </span>
                                              {this.props.basicInfo.address}
                                          </div>
                                          <div className="details-phone1">
                                              <span className="details-field">
                                                  從前主要職業：
                                              </span>
                                              {this.props.basicInfo.past_job}
                                          </div>
                                          <div className="details-phone1">
                                              <span className="details-field">
                                                  教育程度：
                                              </span>
                                              {edu_level}
                                          </div>
                                          <div className="details-phone1">
                                              <span className="details-field">
                                                  婚姻狀況：
                                              </span>
                                              {status}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )
                    : this.props.basicInfo && (
                          <div className="basic-info-wrapper">
                              <div className="basic-info-left">
                                  <div className="details-picture">
                                      <img
                                          src={`${this.props.basicInfo.image}`}
                                          alt={`${this.props.basicInfo.name_chi}相片`}
                                      ></img>
                                  </div>
                              </div>

                              <div className="details-wrapper">
                                  <div>
                                      <div className="details-section-head">
                                          <span>
                                              <span className="details-section-number">
                                                  1
                                              </span>
                                              基本資料
                                          </span>
                                          <Button
                                              className="details-edit-btn blue-btn"
                                              onClick={this.editBtnState}
                                          >
                                              <i className="far fa-save"></i>
                                              {"  " + this.state.editBtnState}
                                          </Button>
                                      </div>

                                      <div>
                                          <span className="details-field">
                                              上傳新相片：
                                          </span>
                                          <label className="details-upload-file">
                                              <input type="file" />
                                              <i className="far fa-image fa-2x"></i>
                                              選擇圖片
                                          </label>
                                      </div>
                                      <div>
                                          <span className="details-field">
                                              住客姓名：
                                          </span>
                                          <input
                                              type="text"
                                              name="name_chi"
                                              value={
                                                  this.props.basicInfo.name_chi
                                              }
                                              onChange={this.handleChange}
                                          />
                                      </div>
                                      <div>
                                          <span className="details-field">
                                              英文姓名：
                                          </span>
                                          <input
                                              type="text"
                                              name="name_eng"
                                              value={
                                                  this.props.basicInfo.name_eng
                                              }
                                              onChange={this.handleChange}
                                          />
                                      </div>
                                      <div>
                                          <span className="details-field">
                                              床號：
                                          </span>
                                          <input
                                              type="number"
                                              name="bed_number"
                                              value={
                                                  this.props.basicInfo
                                                      .bed_number || ""
                                              }
                                              onChange={this.handleChange}
                                          />
                                      </div>
                                      <div>
                                          <span className="details-field">
                                              出生日期：
                                          </span>
                                          <input
                                              type="date"
                                              name="birth_date"
                                              value={
                                                  this.props.basicInfo
                                                      .birth_date
                                              }
                                              onChange={this.handleChange}
                                          />
                                      </div>
                                      <div className="details-age">
                                          <span className="details-field">
                                              年齡：
                                          </span>
                                          {moment().diff(
                                              this.props.basicInfo.birth_date,
                                              "years",
                                              false
                                          )}
                                      </div>
                                      <div>
                                          <span className="details-field">
                                              性別：
                                          </span>
                                          <Button
                                              color="primary"
                                              onClick={() =>
                                                  this.onRadioBtnClick(
                                                      "gender",
                                                      "M"
                                                  )
                                              }
                                              active={
                                                  this.props.basicInfo
                                                      .gender === "M"
                                              }
                                          >
                                              男
                                          </Button>
                                          <Button
                                              color="primary"
                                              onClick={() =>
                                                  this.onRadioBtnClick(
                                                      "gender",
                                                      "F"
                                                  )
                                              }
                                              active={
                                                  this.props.basicInfo
                                                      .gender === "F"
                                              }
                                          >
                                              女
                                          </Button>
                                      </div>
                                      <div>
                                          <span className="details-field">
                                              身份證號碼：
                                          </span>
                                          <input
                                              type="text"
                                              name="id_card_number"
                                              value={
                                                  this.props.basicInfo
                                                      .id_card_number
                                              }
                                              onChange={this.handleChange}
                                          />
                                      </div>
                                      <div>
                                          <span className="details-field">
                                              入住本院日期：
                                          </span>
                                          <input
                                              type="date"
                                              name="check_in_date"
                                              value={
                                                  this.props.basicInfo
                                                      .check_in_date
                                              }
                                              onChange={this.handleChange}
                                          />
                                      </div>
                                      <div>
                                          <span className="details-field">
                                              退院日期：
                                          </span>
                                          <input
                                              type="date"
                                              name="check_out_date"
                                              value={
                                                  this.props.basicInfo
                                                      .check_out_date || ""
                                              }
                                              onChange={this.handleChange}
                                          />
                                      </div>

                                      <div className="details-section-head">
                                          <span>
                                              <span className="details-section-number">
                                                  2
                                              </span>
                                              聯絡人資料
                                          </span>
                                      </div>
                                      <EmergencyContacts
                                          isEditing={this.state.isEditing}
                                          id={this.props.id}
                                      />
                                      <div className="details-section-head">
                                          <span>
                                              <span className="details-section-number">
                                                  3
                                              </span>
                                              住客詳細資料
                                          </span>
                                      </div>

                                      <div>
                                          <span className="details-field">
                                              通訊電話：
                                          </span>
                                          <input
                                              type="number"
                                              name="telephone"
                                              value={
                                                  this.props.basicInfo
                                                      .telephone || ""
                                              }
                                              onChange={this.handleChange}
                                          />
                                      </div>
                                      <div>
                                          <span className="details-field">
                                              通訊地址：
                                          </span>
                                          <input
                                              type="text"
                                              name="address"
                                              value={
                                                  this.props.basicInfo.address
                                              }
                                              onChange={this.handleChange}
                                          />
                                      </div>
                                      <div>
                                          <span className="details-field">
                                              從前主要職業：
                                          </span>
                                          <input
                                              type="text"
                                              name="past_job"
                                              value={
                                                  this.props.basicInfo.past_job
                                              }
                                              onChange={this.handleChange}
                                          />
                                      </div>
                                      <div>
                                          <span className="details-field">
                                              教育程度：
                                          </span>
                                          <Button
                                              color="primary"
                                              onClick={() =>
                                                  this.onRadioBtnClick(
                                                      "edu_level",
                                                      "noEducation"
                                                  )
                                              }
                                              active={
                                                  this.props.basicInfo
                                                      .edu_level ===
                                                  "noEducation"
                                              }
                                          >
                                              未受教育
                                          </Button>
                                          <Button
                                              color="primary"
                                              onClick={() =>
                                                  this.onRadioBtnClick(
                                                      "edu_level",
                                                      "canReadNewspaper"
                                                  )
                                              }
                                              active={
                                                  this.props.basicInfo
                                                      .edu_level ===
                                                  "canReadNewspaper"
                                              }
                                          >
                                              未受教育，但可閱報
                                          </Button>
                                          <Button
                                              color="primary"
                                              onClick={() =>
                                                  this.onRadioBtnClick(
                                                      "edu_level",
                                                      "primary"
                                                  )
                                              }
                                              active={
                                                  this.props.basicInfo
                                                      .edu_level === "primary"
                                              }
                                          >
                                              小學
                                          </Button>
                                          <Button
                                              color="primary"
                                              onClick={() =>
                                                  this.onRadioBtnClick(
                                                      "edu_level",
                                                      "highSchoolOrBelow"
                                                  )
                                              }
                                              active={
                                                  this.props.basicInfo
                                                      .edu_level ===
                                                  "highSchoolOrBelow"
                                              }
                                          >
                                              中學
                                          </Button>
                                          <Button
                                              color="primary"
                                              onClick={() =>
                                                  this.onRadioBtnClick(
                                                      "edu_level",
                                                      "university"
                                                  )
                                              }
                                              active={
                                                  this.props.basicInfo
                                                      .edu_level ===
                                                  "university"
                                              }
                                          >
                                              大學
                                          </Button>
                                      </div>
                                      <div>
                                          <span className="details-field">
                                              婚姻狀況：
                                          </span>
                                          <Button
                                              color="primary"
                                              onClick={() =>
                                                  this.onRadioBtnClick(
                                                      "status",
                                                      "single"
                                                  )
                                              }
                                              active={
                                                  this.props.basicInfo
                                                      .status === "single"
                                              }
                                          >
                                              單身
                                          </Button>
                                          <Button
                                              color="primary"
                                              onClick={() =>
                                                  this.onRadioBtnClick(
                                                      "status",
                                                      "married"
                                                  )
                                              }
                                              active={
                                                  this.props.basicInfo
                                                      .status === "married"
                                              }
                                          >
                                              已婚
                                          </Button>
                                          <Button
                                              color="primary"
                                              onClick={() =>
                                                  this.onRadioBtnClick(
                                                      "status",
                                                      "separate"
                                                  )
                                              }
                                              active={
                                                  this.props.basicInfo
                                                      .status === "separate"
                                              }
                                          >
                                              分居
                                          </Button>
                                          <Button
                                              color="primary"
                                              onClick={() =>
                                                  this.onRadioBtnClick(
                                                      "status",
                                                      "divorce"
                                                  )
                                              }
                                              active={
                                                  this.props.basicInfo
                                                      .status === "divorce"
                                              }
                                          >
                                              離婚
                                          </Button>
                                          <Button
                                              color="primary"
                                              onClick={() =>
                                                  this.onRadioBtnClick(
                                                      "status",
                                                      "widow"
                                                  )
                                              }
                                              active={
                                                  this.props.basicInfo
                                                      .status === "widow"
                                              }
                                          >
                                              鰥寡
                                          </Button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )}
            </div>
        );
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        basicInfo: state.basicInfo.basicInfo,
        contacts: state.basicInfo.contacts,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        fetchBasicInfo: (elderlyID: number) =>
            dispatch(fetchBasicInfo(elderlyID)),
        handleInfoChange: (
            basicInfo: BasicInfoFormat,
            key: string,
            value: string | number
        ) => dispatch(handleInfoChange(basicInfo, key, value)),
        saveEditedInfo: (
            updatedInfo: BasicInfoFormat,
            updatedContacts: Contact[]
        ) => saveEditedInfo(updatedInfo, updatedContacts),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
