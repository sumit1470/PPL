import React from 'react';
import axios from 'axios';
import { RightPortion } from './RightPortion';
import { config } from './Utils';

export class SinglePost extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id: props.match.params.id,
            post: ""
        }  
        console.log("Params in single post component: ",props.match.params);
    }

    stateChange = ()=>{
        alert("This functionality only works on Timeline and Home Page.Thankyou");
    }

    handleCategoryList = ()=>{
        alert("This functionality only works on Timeline and Home Page.Thankyou");
    }

    stateCategoriesChange = ()=>{
        alert("This functionality only works on Timeline and Home Page.Thankyou");
    }
    handleReply = (e)=>{
        // console.log("Event.target.name: "+e.target.name);
            if(e.target.style.background === 'rgb(243, 137, 31)' ){
                e.target.style.background = "rgb(57, 56, 55)";
                document.getElementById(`${e.target.name}reply`).style.display = "block";
            }
            else{
                e.target.style.background = "rgb(243, 137, 31)";
                document.getElementById(`${e.target.name}reply`).style.display = "none";
            }
    }

    handleSubmitComment = (info)=>{
        info.preventDefault();
        // console.log("Text Comment Value: "+document.getElementById('textComment').value);
        console.log("LocalStorage value: "+JSON.stringify(localStorage));
        if(document.getElementById('textComment').value != ""){
            axios({
                method: 'post',
                url: config.SERVER_URL+config.ROUTES.COMMENT,
                data: {email: localStorage.email,image: this.state.post.image,username: this.state.post.username , text: document.getElementById('textComment').value}
            }).then(resp=>{
                    if(resp.data != '0'){
                        console.log("Comments sent by backend: "+JSON.stringify(resp.data.comments));
                        document.getElementById('textComment').value = "";
                        this.setState({"post": resp.data});
                    }
            } )
        }else{
            document.getElementById('errComment').innerHTML = "*Comment text is empty";
        }

    }

    handleSubmitReply = (info)=>{
        
        // console.log("Info.target.name: "+info.target.name);
        if(document.getElementById(`${info.target.name}textReply`).value != "")
        {
            axios({
                method: "post",
                url: config.SERVER_URL+config.ROUTES.REPLYCOMMENT,
                data: {email: localStorage.email,image: this.state.post.image,username: this.state.post.username , text: document.getElementById(`${info.target.name}textReply`).value, comment: info.target.name[0]}
            })
            .then(resp=>{
                console.log("Respone from /replycomment Backend: "+JSON.stringify(resp.data));
                //  console.log("Info target name: "+info.target.name);
                // document.getElementById(`${info.target.name}textReply`).value = ""; 
                this.setState({post: resp.data});
            })
        }
        else{

        }
        info.preventDefault();
    }

    componentDidMount = async ()=>{
        console.log("ComponentWillMount is running");
        if(localStorage.email !=undefined)
        {
            const axiosCall = await axios({
                method: 'post',
                url: config.SERVER_URL+config.ROUTES.SINGLEPOST,
                data: this.state
            });
            if(axiosCall.data!='0'){
                const changeState = await this.setState({"post": axiosCall.data});
                console.log("State after changed in singlepost: "+JSON.stringify(this.state.post.likes.length));
            }
        }
        else{
            this.props.history.push('/');
        }
            
    }

    render(){
        
        return (
            <div>
                <meta charSet="utf-8" />
                <title>Singal Post</title>
                <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
                <link href="/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
                <div className="navbar navbar-inverse navbar-fixed-top">
                    <div className="navbar-inner">
                    <div className="container">
                        <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
                        <a className="brand" href>PPL</a>
                        <div className="pro_info pull-right">
                        <div className="pro_icn"><img src="/images/pic_small.png" /></div>
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
                    <RightPortion changeState={this.stateChange} categoriesStateChange={this.stateCategoriesChange} categoryList={this.handleCategoryList}/>
                    
                    <div className="content_lft">
                        <div className="contnt_2">
                        <div className="div_a">
                        <div className="div_title">{this.state.post.description}</div>
                            <div className="btm_rgt">
                            <div className="btm_arc">{this.state.post.category}</div>
                            </div>
                            <div className="div_top">
            <div className="div_top_lft"><img src="/images/img_6.png" />{this.state.post.username}</div>
                            <div className="div_top_rgt"><span className="span_date">{this.state.post.date}</span><span className="span_time">{this.state.post.time}</span></div>
                            </div>
                            <div className="div_image"><img src={`http://localhost:3002/${this.state.post.image}`} alt="pet" /></div>
                            <div className="div_btm">
                            <div className="btm_list">
                                <ul>
                                <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                                <li><a href="#"><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
            <li><a href="#"><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>{this.state.post.likes == undefined ? '0' : this.state.post.likes.length} Likes</a></li>
            <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>{this.state.post.comments == undefined ? '0' : this.state.post.comments.length} Comments</a></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="contnt_3">
                        <ul>
                            
                            {
                                this.state.post.comments != undefined ? 
                                    this.state.post.comments.map((comment,id)=>
                                    <li key={id}>
                                    <div className="list_image">
                                        <div className="image_sec"><img src="/images/post_img.png" /></div>
                                        <div className="image_name">{comment.email}</div>
                                    </div>
                                    <div className="list_info">
                                        {comment.text}
                                    </div>
                                    <input type="button" name={id} defaultValue={`${comment.replies.length} Reply`} className="orng_btn" style={{background: "#f3891f"}} onClick={this.handleReply}/>
                                    {/* <input type="button" name={`${id}delete`} value='Delete' className="orng_btn" style={{background: 'green'}} onClick={this.handleDeleteComment} /> */}
                                    <div className="cmnt_div" id={`${id}reply`} style={{display: "none"}}>
                                    {
                                        comment.replies!=undefined ?
                                            comment.replies.map(reply =>
                                                <div>
                                                    {reply.text}
                                                    <div className="image_name">{reply.email}</div>
                                                </div>): ""
                                    }
                                        <input type="text" id={`${id}submittextReply`} placeholder="Add a Reply" className="cmnt_bx" />
                                        <input type="submit" name={`${id}submit`} className="sub_bttn" defaultValue="Submit Comment" onClick={this.handleSubmitReply}/>
                                        {/* <input type="submit" name={`${id}delete`} className="sub_bttn" value="Delete" style={{float: "right"}} /> */}
                                    </div>
                                    </li>) : ""
                            }
                            
                            <li>
                            <div className="cmnt_div1">
                                <input type="text" id="textComment" placeholder="Enter your Comment" className="cmnt_bx1"/>
                                <input type="submit" className="sub_bttn1" defaultValue="Submit Comment" onClick={this.handleSubmitComment}/>
                                <p id="errComment" style={{color: "red", display: "block"}}></p>
                            </div>
                            </li>
                        </ul>
                        <div className="view_div"><a href="#">View more</a></div>
                        </div>
                    </div>
                    </div>
                    <div className="clear" />
                </div>
                
            </div>

        )
    }
}




// handleDeleteComment = (e)=>{
    //     axios.post('http://localhost:3002/deletecomment',
    //     {username: this.state.post.username, image: this.state.post.image, no: e.target.name[0]})
    //     .then(resp=>{
    //         console.log("Response from BackEnd: "+resp.data);
    //     })
    // }

{/* <div className="header">
                    <div className="header_lft">
                    <div className="logo"><a href="#"><img src="images/logo.png" /></a></div>
                    <div className="navigatn">
                        <ul>
                        <li><a href="#" className="active">Home</a></li>
                        <li><a href="#"> E-Coupons </a></li>
                        <li><a href="#">E-Brands </a></li>
                        <li><a href="#"> Resuse Market </a></li>
                        <li><a href="#"> Lost and Found</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="header_rgt">
                    <div className="flag_div"><img src="images/flag.png" /></div>
                    <input type="text" placeholder="Search" className="txt_box" />
                    <div className="msg_box"><a href="#"><span className="msg_count">100</span></a></div>
                    <div className="info_div">
                        <div className="image_div"> <img src="images/pic.png" /> </div>
                        <div className="info_div1">Me</div>
                    </div>
                    </div>
                </div> */}


{/* <div className="content_rgt">
                        <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
                        <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
                        <div className="rght_cate">
                        <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                        <div className="rght_list">
                            <ul>
                            <li><a href="#"><span className="list_icon"><img src="/images/icon_01.png" alt="up" /></span> CATS</a></li>
                            <li><a href="#"><span className="list_icon"><img src="/images/icon_02.png" alt="up" /></span> Dogs</a></li>
                            <li><a href="#"><span className="list_icon"><img src="/images/icon_03.png" alt="up" /></span> Birds</a></li>
                            <li><a href="#"><span className="list_icon"><img src="/images/icon_04.png" alt="up" /></span> Rabbit</a></li>
                            <li><a href="#"><span className="list_icon"><img src="/images/icon_05.png" alt="up" /></span> Others</a></li>
                            </ul>
                        </div>
                        </div>
                        <div className="rght_cate">
                        <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                        <div className="sub_dwn">
                            <div className="feat_sec">
                            <div className="feat_sec_img"><img src="/images/feat_img1.png" alt="image" /></div>
                            <div className="feat_txt">Lorem Ipusum Text</div>
                            </div>
                            <div className="feat_sec">
                            <div className="feat_sec_img"><img src="/images/feat_img2.png" alt="image" /></div>
                            <div className="feat_txt">Lorem Ipusum Text</div>
                            <div className="btm_rgt">
                                <div className="btm_arc">Dogs</div>
                            </div>
                            </div>
                            <div className="feat_sec">
                            <div className="feat_sec_img"><img src="/images/feat_img3.png" alt="image" /></div>
                            <div className="feat_txt">Lorem Ipusum Text</div>
                            <div className="btm_rgt">
                                <div className="btm_arc">Rabbits</div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div> */}

{/* <li>
                            <div className="list_image">
                                <div className="image_sec"><img src="/images/post_img.png" /></div>
                                <div className="image_name">Bharat</div>
                            </div>
                            <div className="list_info">
                                This is an example of a comment. You can create as many comments like this one or sub
                                comments as you like and manage all of your content inside your Account.
                            </div>
                            <input type="button" defaultValue="Reply" className="orng_btn" />
                            </li> */}     
                            
{/* <li>
                            <div className="list_image">
                                <div className="image_sec"><img src="/images/post_img.png" /></div>
                                <div className="image_name">Bharat</div>
                            </div>
                            <div className="list_info">
                                This is an example of a comment. You can create as many comments like this one or sub
                                comments as you like and manage all of your content inside your Account.
                            </div>
                            <input type="button" defaultValue="Reply" className="orng_btn" />
                            </li> */}                            

{/* <div className="footr">
                    <div className="footr_lft">
                    <div className="footer_div1">Copyright © Pet-Socail 2014 All Rights Reserved</div>
                    <div className="footer_div2"><a href="#">Privacy Policy </a>| <a href="#"> Terms &amp; Conditions</a></div>
                    </div>
                    <div className="footr_rgt">
                    <ul>
                        <li><a href="#"><img src="images/social_1.png" /></a></li>
                        <li><a href="#"><img src="images/social_2.png" /></a></li>
                        <li><a href="#"><img src="images/social_3.png" /></a></li>
                        <li><a href="#"><img src="images/social_4.png" /></a></li>
                    </ul>
                    </div>
                </div> */}                            