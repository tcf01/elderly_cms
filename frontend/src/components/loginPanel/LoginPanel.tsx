import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPanel.css'
import { Col, Form, FormGroup, Input, Button, Alert, } from 'reactstrap';
import { connect } from 'react-redux';
import { IRootState, ThunkDispatch } from '../../redux/store';
import { login } from '../../redux/login/thunk';

interface ILoginState {
    username: string,
    password: string,

}

interface ILoginProps {
    msg: string,
    login: (username: string, password: string) => void
}

class LoginPanel extends React.Component<ILoginProps, ILoginState>{
    constructor(props: ILoginProps) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
    }

    private handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value } as Pick<ILoginState, keyof ILoginState>);
    }

    render = () => {
        return (
            <div className="loginPanelWrapper">
                <div className="loginPanelContent">
                    <div className="topic">
                        <h1>登入介面</h1>
                        <h5>歡迎使用順泰安老院管理系統</h5>
                    </div>
                    {this.props.msg ? <Alert color="danger">{this.props.msg}</Alert> : ""}
                    <Form className="form">
                        <Col>
                            <FormGroup>
                                帳號名稱：<Input
                                    type="text"
                                    name="username"
                                    id="exampleEmail"
                                    placeholder="請輸入帳號"
                                    value={this.state.username}
                                    onChange={this.handleOnChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                密碼：<Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    value={this.state.password}
                                    placeholder="請輸入密碼"
                                    onChange={this.handleOnChange}
                                    onKeyDown={this.handleKeyDown}
                                />
                            </FormGroup>
                            <div className="loginButton">
                                <Button onClick={this.handleLoginButton} >登入</Button>
                            </div>
                        </Col>
                    </Form>
                </div>
            </div>
        );
    }

    private handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13) {
            this.handleLoginButton()
        }
    }

    handleLoginButton = () => {
        const { username, password } = this.state
        if (username && password) {
            this.props.login(username, password)
        }
    }
}

const mapStateToProps = (state: IRootState) => ({
    msg: state.auth.msg,

})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({

    //前個段應該係對番IProps果個樣，而return果段就應該係對番
    login: (username: string, password: string) => dispatch(login(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel)
