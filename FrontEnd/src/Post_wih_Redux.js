import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { config } from './Utils';
import { connect } from 'react-redux';
import { postUploaded } from './js/actions/index';

const mapStateToProps = state=>{
    return {post: state.post};
}

let id;
export class Post1 extends React.Component{
    constructor(props){
        super(props);

    }

    handleLike(obj){
        console.log("LocalStorage: "+JSON.stringify(localStorage));
        console.log("Liked Object: "+JSON.stringify(obj));
        axios({
            method: 'post',
            url: config.SERVER_URL+config.ROUTES.LIKES,
            data: {email: localStorage.email, image: obj.image, username: obj.username}
        }).then(resp=>{
                this.props.changePost();
        })
    }

    render(){
    
        return (
            <div>
                {/* <meta charSet="utf-8" /> */}
                <title>Home</title>
                {/* <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
                <link href="/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" /> */}
                {console.log("Posts in Post component: "+this.props.post)}
            { this.props.post.length > 0 ?
                this.props.post.map(d=> <div className="contnt_2">
                <div className="div_a">
                <div className="div_title">{d.description}</div>
                <div className="btm_rgt">
                <div className="btm_arc">{d.category}</div>
                </div>
                <div className="div_top">
                <div className="div_top_lft"><img src="images/img_6.png" />{d.username}</div>
                <div className="div_top_rgt"><span className="span_date">{d.date}</span><span className="span_time">{d.time}</span></div>
                </div>
                <div className="div_image"><Link to={`/home/${d._id}`} ><img src={'http://localhost:3002/'+d.image} alt="pet" /></Link></div>
                <div className="div_btm">
                <div className="btm_list">
                    <ul>
                    <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                    <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                    <li onClick={()=>this.handleLike(d)}><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>{d.likes.length} {d.likes.indexOf(localStorage.getItem('email'))==-1?"Like":"Unlike"}</a></li>
                    <li><a href="#"><span class Name="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{d.comments.length} Comments</a></li>
                    </ul>
                </div>
                </div>
                </div>
                </div>) : ""
            }
            </div>
        )}
}

export default connect(mapStateToProps)(Post1)