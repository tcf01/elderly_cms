import React from "react";
import { connect } from "react-redux";
import { IRootState, ThunkDispatch } from "../../../redux/store";
import { Link } from "react-router-dom";
import moment from "moment";
import { fetchClientCards } from "../../../redux/clientCentre/actions";
import { Card } from "../../../redux/clientCentre/state";

interface IClientCardProps {
    cards: Card[];
    fetchClientCards: () => void;
}

class Cards extends React.Component<IClientCardProps> {
    componentDidMount() {
        this.props.fetchClientCards();
    }

    render() {
        console.log(this.props.cards);
        return (
            <>
                {this.props.cards.map((card, index) => (
                    <Link key={index} to={`/client/${card.id}`}>
                        <div className="client-card">
                            <div>
                                <div className="client-img shadow">
                                    <img src={`${card.image}`} alt="" />
                                </div>
                                <div className="client-name-wrapper shadow">
                                    <div className="client-name">
                                        {card.name_chi}
                                    </div>
                                    <div className="client-bed">
                                        床號:
                                        {card.bed_number !== undefined ? (
                                            <div className="client-bed-no">
                                                {card.bed_number}
                                            </div>
                                        ) : (
                                            "未設定"
                                        )}
                                    </div>
                                </div>
                                <div className="client-info-wrapper shadow">
                                    <div className="client-age">
                                        年齡:
                                        {moment().diff(
                                            card.birth_date,
                                            "years",
                                            false
                                        )}
                                    </div>
                                    <div className="client-bed">
                                        出生日期： {card.birth_date}
                                    </div>
                                    <div className="client-bed">
                                        身份證號碼：
                                        {card.id_card_number &&
                                            card.id_card_number.substring(
                                                0,
                                                4
                                            ) + "***(*)"}
                                    </div>
                                </div>
                            </div>
                            <div className="card-layer">
                                <i className="fas fa-mouse-pointer"></i>
                                查閱資料
                            </div>
                        </div>
                    </Link>
                ))}
            </>
        );
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        cards: state.clientcard.cards,
    };
};

//Thunk
const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        fetchClientCards: () => dispatch(fetchClientCards()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
