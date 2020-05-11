import React from 'react';
import axios from 'axios';
import { Post } from './Post';
import {RightPortion} from './RightPortion';
import { config } from './Utils';
import { connect } from 'react-redux';
import { postUploaded } from './js/actions/index';
import RightPortion1 from './RightPortion_with_redux';
import Post1 from './Post_wih_Redux';

const mapStateToProps = state=>{
    return {post: state.post,categories: state.categories};
}

let cdata;
class Home1 extends React.Component{
    constructor(props){
        super(props);
    }

    handleCategoryList = (e)=>{
        console.log("Data in handle categorylist: "+JSON.stringify(cdata));
        console.log(e.target.innerText);
        const fltr = p => p.category === e.target.innerText;    
        const temp = cdata.filter(fltr);
        console.log(temp);
        this.props.postUploaded(temp);
    }


    changePostState = ()=>{
        axios({
            method: 'get',
            url: config.SERVER_URL+config.ROUTES.SHOWPOST
        }).then(async resp=>{
            if(resp.data != '0'){
                const posts = await this.setState({post: resp.data});
                this.props.postUploaded(resp.data);
            }
        })
    }

    handlePost = (e)=>{
        console.log("Event.taget.innerText: "+e.target.innerText);
        let posts = this.props.post;
        if(e.target.innerText === "Latest First"){
            posts.sort((a,b)=>new Date(`${b.date} ${b.time}`)-new Date(`${a.date} ${a.time}`));
            
        }
        
        else if(e.target.innerText === "Oldest First"){
            posts.sort((a,b)=>new Date(`${a.date} ${a.time}`)-new Date(`${b.date} ${b.time}`));
            
        }
        
        else if(e.target.innerText === "Most Likes"){
            posts.sort((a,b)=>b.likes.length-a.likes.length);
            
        }
        
        else if(e.target.innerText === "Most Commented"){
            posts.sort((a,b)=>b.comments.length-a.comments.length);
            
        }
        this.props.postUploaded(posts);
        console.log(`Post after clicked ${e.target.innerText}: `+JSON.stringify(this.props.post));
    }

    componentDidMount = ()=>{
        if(localStorage.email != undefined){
            axios({
                method: 'get',
                url: config.SERVER_URL+config.ROUTES.SHOWPOST
            }).then(resp=>{
                cdata = resp.data;
                console.log("Data Array in Home: "+JSON.stringify(cdata));
                this.props.postUploaded(resp.data);
            })
        }
    }

    render() {
        return (
            <div>
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
                    <RightPortion1 categoryList={this.handleCategoryList} />
                        <div className="content_lft">
                        <div className="contnt_1">
                        <div className="list_1">
                            <ul>
                            <li>
                                <input type="checkbox" className="chk_bx" />
                                Friends</li>
                            <li>
                                <input type="checkbox" className="chk_bx" />
                                Flaged</li>
                            </ul>
                        </div>
                        <div className="post_div">
                            <div className="post_list">
                            <ul>
                                <li onClick={this.handlePost}><a href="#"><span className="list_img"><img src="/images/img_1.png" /></span>Latest First</a></li>
                                <li onClick={this.handlePost}><a href="#"><span className="list_img"><img src="/images/img_2.png" /></span>Oldest First</a></li>
                                <li onClick={this.handlePost}><a href="#"><span className="list_img"><img src="/images/img_4.png" /></span>Most Likes</a></li>
                                <li onClick={this.handlePost}><a href="#"><span className="list_img"><img src="/images/img_5.png" /></span>Most Commented</a></li>
                            </ul>
                            </div>
                        </div>
                        </div>
                        <div>
                            <Post1 changePost={this.changePostState}/>
                        </div>
                        
                    </div>
                    </div>
                    <div className="clear" />
                </div>
                
            </div>

        )
    }
}

export default connect(mapStateToProps,{ postUploaded })(Home1);