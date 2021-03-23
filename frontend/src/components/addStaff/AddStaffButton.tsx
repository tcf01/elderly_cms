/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import "./AddStaffButton.css"

const { REACT_APP_API_SERVER } = process.env

interface IAddStaffProps {
    refresh: () => void
}

interface IAddStaffState {
    modal: boolean,
    name: string,
    username: string,
    password: number | null,
    role_id: number | null,
}

class AddStaffButton extends React.Component<IAddStaffProps, IAddStaffState> {
    constructor(props: IAddStaffProps) {
        super(props);
        this.state = {
            modal: false,
            name: "",
            username: "",
            password: null,
            role_id: 2,
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    private unitChange = (event: React.ChangeEvent<any>) => {
        let name= event.target.name
       this.setState({
           ...this.state,
           [name]:event.target.value
       })
    }

    dataSubmit = async () => {
        await fetch(`${REACT_APP_API_SERVER}/auth/addStaff`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(this.state)
        });
        alert("新增完成")
        this.toggle()
        this.props.refresh()
    }

    render() {
        return (
            <div>
                <Button className="addStaffButton" onClick={this.toggle}>新增員工</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>新增員工</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">員工姓名</Label>
                                <Input type="text" name="name" id="staffName" placeholder="輸入姓名" onChange={(event) => this.unitChange(event)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">登入帳號</Label>
                                <Input type="text" name="username" id="loginAcc" placeholder="輸入帳號" onChange={(event) => this.unitChange(event)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">密碼</Label>
                                <Input type="password" name="password" id="Password" placeholder="輸入" onChange={(event) => this.unitChange(event)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">權限</Label>
                                <Input type="select" name="role_id" id="exampleSelect" onChange={(event) => this.unitChange(event)}>
                                    <option value="2" >主管</option>
                                    <option value="1">員工</option>
                                    <option value="3">登記新住客</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=>this.dataSubmit()}>輸入</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>取消</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddStaffButton;