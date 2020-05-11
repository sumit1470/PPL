import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {config} from './Utils';

export class Register extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
    }
  }


  handleFocus = (e)=>{
      axios({
        method: 'post',
        url: config.SERVER_URL+config.ROUTES.CHECKUSERNAME,
        data: this.state
      }).then(resp =>{
          console.log("response from checkUsername: ",resp.data);
          if(resp.data=='1'){
            document.getElementById('submit').disabled = true;
            document.getElementById('username1').innerHTML = "*This username is already taken";
            document.getElementById('username1').style.color = "red";
          }
          else{
            document.getElementById('submit').disabled = false;
            document.getElementById('username1').innerHTML = "*This username is available";
            document.getElementById('username1').style.color = "green";
          }
      })
  }

  handleChange = (e)=>{
      this.setState({[e.target.name]: e.target.value});
      console.log('name of the input: '+ e.target.name);
      console.log('values of the input: '+e.target.value);
  }

  registerUser = (info)=>{
    const uSername = document.getElementById('username').value;
    const pAssword = document.getElementById('password').value;
    const eMail = document.getElementById('email').value;
    const fIrstname = document.getElementById('firstname').value;
    const lAstname = document.getElementById('lastname').value;
    console.log(uSername,",",eMail,",",pAssword,",",fIrstname,",",lAstname);
    if(document.getElementById('myCheck').checked === true && uSername!="" && eMail!="" && pAssword!="" && fIrstname!="" && lAstname!=""){
      info.preventDefault();
        axios({
          method: 'post',
          url: config.SERVER_URL+config.ROUTES.SIGNUP,
          data: this.state
        }).then(resp=>{
            if(resp.data == '0'){
                document.getElementById('doneRegistration').innerHTML = "*Verification email has been sent to your registered email id. Thankyou";
            }
            else{
              document.getElementById('doneRegistration').innerHTML = "*This email id is already registered";
            }
        })
    }
    else{
      console.log(document.getElementById('myCheck').checked);
      document.getElementById('doneRegistration').innerHTML = "*Please accept Terms and conditions for signup or Enter all details";
    }
  }


  render(){
  return (
    <div>
  <meta charSet="utf-8" />
  <title>Create An Account</title>
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
  <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
  <div className="navbar navbar-inverse navbar-fixed-top">
    <div className="navbar-inner">
      <div className="container">
        <button
          type="button"
          className="btn btn-navbar"
          data-toggle="collapse"
          data-target=".nav-collapse"
        >
          {" "}
          <span className="icon-bar" /> <span className="icon-bar" />{" "}
          <span className="icon-bar" />{" "}
        </button>
        <a className="brand" href>
          PPL
        </a>
        <div className="pro_info pull-right">
          <div className="pro_icn">
            <img src="images/pic_small.png" />
          </div>
          <div className="pro_txt">
            Me
            <b className="caret" />
          </div>
          <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
            <li>
              <a tabIndex={-1} href="#">
                My Profile
              </a>
            </li>
            <li>
              <a tabIndex={-1} href="#">
                Message Box
              </a>
            </li>
            <li>
              <a tabIndex={-1} href="#">
                Change Language
              </a>
            </li>
            <li className="divider" />
            <li>
              <a tabIndex={-1} href="#">
                <input type="text" placeholder="search" />
              </a>
            </li>
          </ul>
        </div>
        <div className="nav-collapse collapse">
          <ul className="nav">
            <li className="active">
              {" "}
              <a href>Home</a>{" "}
            </li>
            <li className>
              {" "}
              <a href>E-Coupons</a>{" "}
            </li>
            <li className>
              {" "}
              <a href>E-Brands</a>{" "}
            </li>
            <li className>
              {" "}
              <a href>Resuse Market</a>{" "}
            </li>
            <li className>
              {" "}
              <a href>Lost and Found</a>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
 
  <div className="container">
    <div className="content">
      <div className="content_rgt">
        <div className="register_sec">
          <h1>Create An Account</h1>
          <ul>
            <li>
              <span>Username</span>
              <input id="username" name="username" type="text" placeholder="Enter your username" onChange={this.handleChange} onBlur={this.handleFocus}/>
              <p id="username1" style={{color: "green", margin: 0, display: "block"}}></p>
            </li>
            <li>
              <span>Password</span>
              <input id="password" name="password" type="text" placeholder="Enter your password" onChange={this.handleChange}/>
              <p id="errorPassword" style={{color: "red"}}></p>
            </li>
            <li>
              <span>Email</span>
              <input id="email" name="email" type="text" placeholder="Enter your email" onChange={this.handleChange}/>
            </li>
            <li>
              <span>First Name</span>
              <input id="firstname" name="firstname" type="text" placeholder="Enter your first name" onChange={this.handleChange}/>
            </li>
            <li>
              <span>Last Name</span>
              <input id="lastname" name="lastname" type="text" placeholder="Enter your last name" onChange={this.handleChange}/>
            </li>
            <li>
              <input id="myCheck" type="checkbox"/>I agree to Term &amp; Conditions
            </li>
            <li>
              <input id="submit" type="submit" defaultValue="Register" onClick = {this.registerUser}/>
              <p id="doneRegistration" style={{color: "red", display: "block"}}></p>
            </li>
          </ul>
          <div className="addtnal_acnt">
            I already have an account.<Link to="/">Login My Account !</Link>
          </div>
        </div>
      </div>
      <div className="content_lft">
        <h1>Welcome from PPL!</h1>
        <p className="discrptn">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text.{" "}
        </p>
        <img src="images/img_9.png" alt />{" "}
      </div>
    </div>
  </div>
  <div className="clear" />
  
</div>
  );}
}

 {/* <div className="header">
    <div className="header_lft">
      <div className="logo">
        <a href="#">
          <img src="images/logo.png" />
        </a>
      </div>
      <div className="navigatn">
        <ul>
          <li>
            <a href="#" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#"> E-Coupons </a>
          </li>
          <li>
            <a href="#">E-Brands </a>
          </li>
          <li>
            <a href="#"> Resuse Market </a>
          </li>
          <li>
            <a href="#"> Lost and Found</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="header_rgt">
      <div className="flag_div">
        <img src="images/flag.png" />
      </div>
      <input type="text" placeholder="Search" className="txt_box" />
      <div className="msg_box">
        <a href="#">
          <span className="msg_count">100</span>
        </a>
      </div>
      <div className="info_div">
        <div className="image_div">
          {" "}
          <img src="images/pic.png" />{" "}
        </div>
        <div className="info_div1">Me</div>
      </div>
    </div>
  </div> */}

  {/* <div className="footr">
    <div className="footr_lft">
      <div className="footer_div1">
        Copyright © Pet-Socail 2014 All Rights Reserved
      </div>
      <div className="footer_div2">
        <a href="#">Privacy Policy </a>| <a href="#"> Terms &amp; Conditions</a>
      </div>
    </div>
    <div className="footr_rgt">
      <ul>
        <li>
          <a href="#">
            <img src="images/social_1.png" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src="images/social_2.png" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src="images/social_3.png" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src="images/social_4.png" />
          </a>
        </li>
      </ul>
    </div>
  </div> */}