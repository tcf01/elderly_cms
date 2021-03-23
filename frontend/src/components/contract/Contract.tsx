import * as React from 'react';
import './Contract.css'
import { ThunkDispatch, IRootState } from '../../redux/store';
import { remoteLoadContract } from '../../redux/contract/thunk';
import { connect } from 'react-redux';
import { ContractInfo } from '../../redux/contract/state';
import moment from 'moment';
import { Link } from 'react-router-dom';



// const SignaturePad = require('react-signature-pad').default;

export interface IContractProps {
    loadContract: () => void
    contract: ContractInfo
}

class Contract extends React.Component<IContractProps> {

    componentDidMount = () => {
        this.props.loadContract()
    }

    render() {

        return (
            <div className="contract-wrapper">
                <label className="story">

                </label>
                <h3>順泰護老中心</h3>
                <h3>Shun Tai Gericare Centre</h3>
                <div className="address contract-item">新界葵芳美芳街8號昌鴻大廈地下6號舖及一樓</div>
                <div className="contactNumber contract-item">電話:&nbsp;24260163  &nbsp;&nbsp;&nbsp;&nbsp;  24290301</div>
                <div className="dateAndRegister contract-item">
                    <div className="hidden contract-item">日期: {moment().format('YYYY-MM-DD')}</div>
                    <div className="register contract-item"><h4>入院登記表</h4></div>
                    <div className="date contract-item">日期: {moment().format('YYYY-MM-DD')}</div>
                </div>

                <div>
                    <div className="table1 contract-item">
                        <div className="flex bord">
                        <div>住院者姓名 : {localStorage.getItem('name_chi')}</div>
                        <div>身份證 : {localStorage.getItem('id_card_number')}</div>
                        <div>年齡 : {
                            moment().diff(`"${localStorage.getItem('birth_date')}"`, 'years', false
                            )
                        }</div>
                        <div className="gender">性別 : {localStorage.getItem('gender')==="M"?"男":"女"}</div>
                        </div>
                        <div className="flex bord">
                        <div className="size">聯絡人姓名 : {localStorage.getItem('emergency_contact')}</div>
                        <div className="size">關係 : {localStorage.getItem('emergency_relation')}</div>
                        </div>
                        <div className="bord">聯絡人電話 : {localStorage.getItem('emergency_contact_telephone')}</div>
                        {/* <div>地址:{localStorage.getItem('address')}</div> */}
                        <div className="bord">住院者病況 :</div>
                    </div>
                </div>
                        <div className="text-centre contract-item">規條</div>
                <ol className="contract-item">
                    {this.props.contract.basicContract.split("\n").map((point) => {
                        const trimmedPoint = point.trim()
                        if (isNaN(parseInt(trimmedPoint[0]))) {
                            return <>{trimmedPoint}<br /></>
                        }
                        return <li>{trimmedPoint.replace(/^[0-9.]+/g, "")}</li>
                    })}
                </ol>
                <div className="contract-item">{this.props.contract.additionContract}</div>
                <div className="flex upper-space contract-item">
                <div className="size contract-item">簽署:______________________________</div>
                <div className="size contract-item">身份證號碼:{localStorage.getItem('emergency_id')}</div>
                </div>
                <div className="upper-space contract-item">入住日期:{localStorage.getItem('check_in_date')}</div>
                <Link to="/register"><button>返回</button></Link>
                <Link to="/client"><button>完成</button></Link>
            </div >

        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        contract: state.contract.content
    }
}


// Thunk
const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        loadContract: () => dispatch(remoteLoadContract())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contract);