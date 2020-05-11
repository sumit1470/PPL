import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {config} from './Utils';

export class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        }
        
    }

    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value});
        console.log('Name of State: '+e.target.name);
        console.log('Value of State: '+e.target.value);
    }

    submitLogin = (info)=>{
        info.preventDefault();
        const eMail = document.getElementById('email').value;
        const pAssword = document.getElementById('password').value; 
        if(eMail && pAssword)
        {
            axios({
                method: 'post',
                url: config.SERVER_URL+config.ROUTES.LOGIN,
                data: this.state
            }).then(resp=>{
                console.log('submit login response: '+JSON.stringify(resp.data));
                if(resp.data == '0'){
                    document.getElementById('err').innerHTML = "*This account is not yet registered";
                }
                else if(resp.data == '3'){
                    document.getElementById('err').innerHTML = "*Your account is not verified yet.";
                }
                else if(resp.data == '2'){
                    document.getElementById('err').innerHTML = "*Your password is wrong";
                }
                else{
                    localStorage.setItem('email',resp.data.email);
                    // if(document.getElementById('remember').checked=== true){
                    //     localStorage.setItem('email',resp.data.email);  
                    // }

                    console.log(localStorage.getItem('email'));
                    document.getElementById('err').style.color = "blue";
                    document.getElementById('err').innerHTML = "*You have successfully Logged in"; 
                    this.props.history.push('/home');
                    
                }
            });
        }
        else{
            document.getElementById('err').innerHTML = "*Please enter all details";
        }
    }

    componentDidMount = ()=>{
        if(localStorage.email != undefined){
            this.props.history.push('/timeline');
        }
    }

    render(){
        return (
            <div>
                <title>Login Account</title>
                <div className="navbar navbar-inverse navbar-fixed-top">
                    <div className="navbar-inner">
                    <div className="container">
                        <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
                        <a className="brand" href>PPL</a>
                        <div className="pro_info pull-right">
                        <div className="pro_icn"><img src="images/pic_small.png" /></div>
                        <div className="pro_txt">Me<b className="caret" /></div>
                        <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                            <li><a tabIndex={-1} href="#">My Profile</a></li>
                            <li><a tabIndex={-1} href="#">Message Box</a></li>
                            <li><a tabIndex={-1} href="#">Change Language</a></li>
                            <li className="divider" />
                            <li><a tabIndex={-1} href="#">
                                <input type="text" placeholder="search" />
                            </a></li>
                        </ul>
                        </div>
                        <div className="nav-collapse collapse">
                        <ul className="nav">
                            <li className="active"> <a href>Home</a> </li>
                            <li className> <a href>E-Coupons</a> </li>
                            <li className> <a href>E-Brands</a> </li>
                            <li className> <a href>Resuse Market</a> </li>
                            <li className> <a href>Lost and Found</a> </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div className="container">
                    <div className="content">
                    <div className="content_rgt">
                        <div className="login_sec">
                        <h1>Log In</h1>
                        <ul>
                            <li><span>Email-ID</span><input name="email" id="email" type="text" placeholder="Enter your email" onChange={this.handleChange}/>
                            </li>
                            <li><span>Password</span><input name="password" id="password" type="text" placeholder="Enter your password" onChange={this.handleChange} /></li>
                            <li><input id="remember" type="checkbox" />Remember Me</li>
                            <li><input type="submit" defaultValue="Log In" onClick={this.submitLogin}/><Link to="/forgot">Forgot Password</Link>
                            <p id="err" style={{color: "red"}}></p></li>
                        </ul>
                        <div className="addtnal_acnt">I do not have any account yet.<Link to="/register">Create My Account Now !</Link></div>
                        </div>
                    </div>
                    <div className="content_lft">
                        <h1>Welcome from PPL!</h1>
                        <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                        <img src="images/img_9.png" alt="" /> 
                    </div>
                    </div>
                </div>
                <div className="clear" />
                
            </div>

        )
    }
}