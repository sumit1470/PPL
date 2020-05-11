import React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.Component{
    constructor(props){
        super(props);

        console.log("Local Storage in header: "+JSON.stringify(localStorage));
        
    }

    handleLogout = ()=>{
        localStorage.removeItem('email');
        this.props.history.push('/');
    }
 
    
    render(){
        return (
            <div>
            <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
            <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
                <div className="header">
                    <div className="header_lft">
                    <div className="logo"><a href="#"><img src="/images/logo.png" /></a></div>
                    {
                    localStorage.email != undefined ?
                    <div className="navigatn">
                        <ul>
                        <li><Link to="/home"><a href="#" className="active">Home</a></Link></li>
                        <li><a href="#"> E-Coupons </a></li>
                        <li><a href="#">E-Brands </a></li>
                        <li><a href="#"> Resuse Market </a></li>
                        <li><a href="#"> Lost and Found</a></li>
                        </ul>
                    </div> : ""}
                    </div>
                    <div className="header_rgt">   
                            {
                                    localStorage.email != undefined ?
                                <div>
                                <div className="flag_div"><img src="/images/flag.png" /></div>
                                <input type="text" placeholder="Search" className="txt_box" />
                                <div className="msg_box"><a href="#"><span className="msg_count">100</span></a></div>
                                <div className="info_div">
                                <Link to="/timeline">
                                    <div className="image_div"> <img src="/images/pic.png" /> </div>
                                    <div className="info_div1">Me</div></Link>    
                                </div>
                                <div className="lgt_btn"><img src="/images/orangebtn.png" onClick={this.handleLogout}/></div> 
                            </div>: "" }
                        
                    
                    </div>
                    </div>
                </div>
        )
    }
}