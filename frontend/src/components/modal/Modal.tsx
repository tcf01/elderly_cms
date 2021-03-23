import React from 'react';
import './Modal.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { IModalProps } from '../../redux/modal/state';
import { connect } from 'react-redux';
import { ThunkDispatch } from '../../redux/store';
import { push } from 'connected-react-router';
import { Dispatch } from 'redux';

export interface IModalState {
    modal: boolean
}

export class FinishModal extends React.Component<IModalProps, IModalState> {
    constructor(props: IModalProps) {
        super(props);
        this.state = {
            modal: false
        };
        // this.toggle = this.toggle.bind(this);
    }

    public toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    public toNextPage = (dispatch: Dispatch, path: string) => {
         dispatch(push(path))
    }

    render() {
        return (
            <>
                {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
                <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>溫馨提醒</ModalHeader>
                    <ModalBody>
                        {this.props.procedure === 2 ? <span className="modalText">所有院友的藥物已經取出，需要進行核藥步驟請按「繼續」，否則請按返回</span> : <span className="modalText">所有院友的藥物已經核實。請於指定時間內派藥。</span>}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => 
                            {
                                if (this.props.procedure === 2){
                                    this.props.toNextPage('/medicine/verify/1')
                                } else{
                                    this.props.toNextPage('/medicine/distribute')
                                } 
                            }}>繼續</Button>
                        {/* <Button color="primary" onClick={() => this.props.toNextPage('/medicine/verify/1')}>繼續</Button> */}
                    <Button color="secondary" onClick={() => this.props.toNextPage('/client')}>返回</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

// const mapStateToProps = (state: IRootState) => {
//     return {

//     }
// }

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        
        toNextPage: (path: string) => dispatch(push(path))
    }
}

export default connect(null,mapDispatchToProps)(FinishModal)