import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import React from 'react';
import { postData } from "../controllers/main";
import config from "../data/app.config";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRegex = /(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;

/* the main page for the home route of this app */
class SignInComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            errors: [],
            userNameDisplay: false,
            submitBtnTxt: 'SignIn',
            submitBtnDisabled: false,
            usrnm: '',
            psw: '',
            email: '',
            hasSignInCheckPassed:false,
        }
        this.clickHandler = this.clickHandler.bind(this)
        this.userNameChange =this.userNameChange.bind(this)
        this.passwordChange =this.passwordChange.bind(this)
        this.emailChange = this.emailChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }

    clickHandler(e) {
        let elem = e.target;
        if (elem.id == 'sign-in-btn' && this.state.submitBtnTxt == 'SignUp') {
            elem.classList.add('active')
            document.querySelector('#sign-up-btn').classList.remove('active')
            
            for (let i of this.state.errors) 
                document.querySelector('#' + i).style.display = "none"
            this.setState({
                userNameDisplay: false,
                submitBtnTxt: "SignIn",
                submitBtnDisabled: false,
                errors: [],
                usrnm: '',
                psw: '',
                email: ''
            });
        }
        else if (elem.id == 'sign-up-btn' && this.state.submitBtnTxt == 'SignIn') {
            elem.classList.add('active')
            document.querySelector('#sign-in-btn').classList.remove('active')
            this.setState({
                usrnm: '',
                psw: '',
                email: ''
            })
            this.setState((state,props)=>{
                let errors=this.rtnErrors(state);
                return  {
                    userNameDisplay: true,
                    submitBtnTxt: "SignUp",
                    errors:errors,
                    submitBtnDisabled: errors.length?true:false,
                }
            })
        }
    }

    rtnErrors(state,strictCheck) {
        let errors = [];
        state=state?state:this.state
        for(let i of state.errors) 
            document.querySelector('#' + i).style.display = "none";
        if (!state.usrnm && strictCheck)  errors.push('user-name-error')    
        if ((state.email || strictCheck) && !emailRegex.test(state.email))  errors.push('email-error')
        if ((state.psw || strictCheck) && !passRegex.test(state.psw))  errors.push('psw-error')
        for(let i of errors) 
            document.querySelector('#' + i).style.display = "block";
        return errors;
    }

    setCommonStateChange(name,value) {
            this.setState({
                [name]:value
            })
            if (this.state.submitBtnTxt == "SignIn") return;
            this.setState((state,props)=>{
                let errors=this.rtnErrors(state);
                return  {
                    errors:errors,
                    submitBtnDisabled: errors.length?true:false
                }
            })
    }

    passwordChange(e){
        this.setCommonStateChange(e.target.name,e.target.value);
    }
    emailChange(e){
        this.setCommonStateChange(e.target.name,e.target.value);
    }
    userNameChange(e) {
        this.setCommonStateChange(e.target.name,e.target.value);
    }

   onSubmit(e) {
        e.preventDefault();
        if (this.state.submitBtnTxt == "SignIn") {
            if (!this.state.email || !this.state.psw) return alert("No email or password!!");
            else {
                return this.props.logIn({ password: this.state.psw, email: this.state.email })
                .then(()=>{
                    this.setState({
                        hasSignInCheckPassed:true
                    })
                })
            }
        }
        let errors=this.rtnErrors(null,true)
        if (errors.length) 
            return this.setState({
                errors:errors,
                submitBtnDisabled: errors.length?true:false
            });
        else {
            console.log('o')
            postData(config.api.base + config.api.signUpPath, { fullName: this.state.usrnm, password: this.state.psw, email: this.state.email })
                .then(data => {
                    this.state.usrnm= this.state.psw= this.state.email= '';
                    alert("Hey " + data.fullName + "! Signup was successfull! Must Login Now.");
                })
                .catch(error => alert(error));
        }
    }
    
    render() {

        if(this.state.hasSignInCheckPassed) 
            return  <Redirect to="/profile" />

        return (
            <form id="form-container" onSubmit={this.onSubmit}>
                <div className="slider">
                    <div id="form-tab">
                        <span id="sign-in-btn" className="active" onClick={this.clickHandler}>SignIn</span>
                        <span id="sign-up-btn" onClick={this.clickHandler}>SignUp</span>
                    </div>

                    <div id="user-name" className="input-container" style={{ display: (this.state.userNameDisplay ? "block" : "none") }}>
                        <input className="input-field effect-1" type="text" placeholder="Username" name="usrnm" value={this.state.usrnm} onChange={this.userNameChange} />
                        <span className="focus-border"></span>
                    </div>
                    <div id="user-name-error" className="error input-error">
                        User Name is required.
                    </div>

                    <div className="input-container">
                        <input className="input-field effect-1" type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.emailChange}/>
                        <span className="focus-border"></span>
                    </div>
                    <div id="email-error" className="input-error">
                        Email is Incorrect.
                        </div>

                    <div className="input-container">
                        <input className="input-field effect-1" type="password" placeholder="Password" name="psw"  value={this.state.psw} onChange={this.passwordChange} />
                        <span className="focus-border"></span>
                    </div>

                    <ul id="psw-error" className="input-error" >
                        <li>Length should between 8-20 characters</li>
                        <li>Should contain atleast one lowercase and uppercase character</li>
                        <li>Should contain atleast one special character</li>
                    </ul>
                    <div className="d-flex justify-content-center">
                        <button id="submit-btn" disabled={this.state.submitBtnDisabled} type="submit" className="btn btn-outline-light btn-dark">{this.state.submitBtnTxt}</button>
                    </div>

                </div>
            </form>

        );
    }
}

export default SignInComponent;

