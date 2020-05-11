import React from 'react';
import axios from 'axios';
import Post1 from './Post_wih_Redux';
import { RightPortion } from './RightPortion';
import { config } from './Utils';
import { connect } from 'react-redux';
import { postUploaded } from './js/actions/index';

const mapStateToProps = state =>{
    return {post: state.post}; 
}

let setPostForm=0;
let setCategoryForm=0;
let cdata;
let defaultCategories = ['Dogs', 'Cats', 'Birds', 'Rabbits', 'Others'];
let name;
class Timeline extends React.Component{

    constructor(props){
        super(props);

        this.state={
            post: [],
            categories: []
        }
        console.log("Local Storage object in timeline: "+JSON.stringify(localStorage.getItem('email')));
    }

    
    handleCategoryList = (e)=>{
        console.log("Data in handle categorylist: "+JSON.stringify(cdata));
        console.log(e.target.innerText);
        const fltr = p => p.category === e.target.innerText;
        const temp = cdata.filter(fltr);
        console.log(temp);
        this.props.postUploaded(temp);
    }

    stateChange = (data)=>{
        let data1;
        axios({
            method: 'post',
            url: config.SERVER_URL+config.ROUTES.USER,
            data: localStorage
        }).then(resp=>{
            data1 = data.filter(post=> post.username == resp.data.username );
            cdata = data1;
            // this.setState({post: data1});
            this.props.postUploaded(data1);
        })
    }

    // stateCategoriesChange = (data)=>{
    //     this.setState({categories: data});
    // }

    changePostState = ()=>{
        let data1;
        axios({
            method: 'post',
            url: config.SERVER_URL+config.ROUTES.USER,
            data: localStorage
        }).then(response=>{
            axios.get("http://localhost:3002/showpost").then(resp=>{
                data1 = resp.data.filter(post => post.username === response.data.username);
            if(resp.data != '0'){
                // const posts = await this.setState({post: data1});
                this.props.postUploaded(data1);
            }
        })
        })
        
    }

    componentDidMount = ()=>{
        console.log('ComponentDidMount is called here');
        let data1;
        if(localStorage.email != undefined)
        {
            axios({
                method: 'post',
                url: config.SERVER_URL+config.ROUTES.USER,
                data: localStorage
            }).then(response=>{
                console.log("Response data from /user on frontend: "+JSON.stringify(response.data));
                name = response.data.firstname + " " + response.data.lastname;
                axios({
                    method: 'get',
                    url: config.SERVER_URL+config.ROUTES.SHOWPOST
                }).then(resp=>{
                if(resp.data != '0')
                {
                    data1 = resp.data.filter(post=> post.username === response.data.username);
                    this.props.postUploaded(data1); 
                    // console.log("Posts value: "+posts);
                    cdata = data1;
                    console.log("Data Array is: "+JSON.stringify(cdata));
                }else{
                    console.log("Error in fetching posts from Backend: "+resp.data);
                }
            })
            })
            

           
        }
        else{
            this.props.history.push('/');
        }
    }

    render(){
        return (
            <div>
                <title>Home</title>
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
                        <RightPortion changeState={this.stateChange} categoriesStateChange={this.stateCategoriesChange} categoryList={this.handleCategoryList}/>
                   
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
                        <div className="timeline_div">
                            <div className="timeline_div1">
                            <div className="profile_pic" style={{height: "157px"}}>
                                <img src="images/krishna.jpg" style={{height: "157px"}}/>
                                <div className="profile_text"><a href="#">Change Profile Pic</a></div>
                            </div>
                            <div className="profile_info">
                                <div className="edit_div"><a href="#">Edit <img src="images/timeline_img.png" /></a></div>
                                <div className="profile_form">
                                <ul>
                                    <li>
                                    <div className="div_name1">Name :</div>
                                    <div className="div_name2">{name}</div>
                                    </li>
                                    <li>
                                    <div className="div_name1">Sex :</div>
                                    <div className="div_name2">Male</div>
                                    </li>
                                    <li>
                                    <div className="div_name1">Description :</div>
                                    <div className="div_name3">This is an example of a comment. You can create as many comments like this one
                                        or sub comments as you like and manage all of your content inside Account.</div>
                                    </li>
                                </ul>
                                </div>
                            </div>
                            </div>
                            <div className="timeline_div2">
                            <ul>
                                <li><a href="#" className="active">Timeline    </a></li>
                                <li><a href="#">About  </a></li>
                                <li><a href="#">Album</a></li>
                                <li><a href="#"> Pets</a></li>
                                <li><a href="#">My Uploads </a></li>
                            </ul>
                            </div>
                        </div>
                        </div>
                        
                        <Post1 changePost={this.changePostState}/>
                    </div>
                    </div>
                    <div className="clear"/>
                </div>
                
            </div>

        )
    }
}

export default connect(mapStateToProps, { postUploaded })(Timeline);





// handleUpload=()=>{
    //     if(setPostForm == 0 )
    //     {
    //         document.getElementById('post-form').style.display = "block";
    //         // document.getElementById('post-form').style.transitionDuration = "3s";
    //         // document.getElementById('post-form').style.transitionProperty = "down";
    //         setPostForm= 1;
    //         document.getElementById('category-form').style.display = "none";
    //         setCategoryForm=0;
    //         console.log("Check setPostForm value:", setPostForm );
    //     }
    //     else if(setPostForm == 1){
    //         document.getElementById('post-form').style.display = "none";
    //         setPostForm=0;
    //         console.log("Check setPostForm value:", setPostForm);
    //     }
    // }

    // handleUploadCategory = ()=>{
    //     if(setCategoryForm == 0 )
    //     {
    //         document.getElementById('category-form').style.display = "block";
    //         // document.getElementById('category-form').style.transitionDuration = "3s";
    //         // document.getElementById('category-form').style.transitionProperty = "down";
    //         setCategoryForm= 1;
    //         document.getElementById('post-form').style.display = "none";
    //         setPostForm=0;
    //         console.log("Check setCategoryForm value:", setCategoryForm );
    //     }
    //     else if(setCategoryForm == 1){
    //         document.getElementById('category-form').style.display = "none";
    //         setCategoryForm=0;
    //         console.log("Check setCategoryForm value:", setCategoryForm);
    //     }
    // }

    // handleChange = (e)=>{
    //     if(e.target.name!="selectedImage" && e.target.name!="categoryImage")
    //     {
    //         this.setState({[e.target.name]: e.target.value});
    //         console.log('Name of state: '+e.target.name);
    //         console.log('Value of state: '+e.target.value);
    //     }
    //     else{
    //         console.log(e.target.files[0]);
    //         this.setState({[e.target.name]: e.target.files[0]});
    //         console.log("Name of the state: "+e.target.name);
    //         console.log("Value of the state: "+e.target.files[0]);
            
    //     }
    // }

    // handlePost=(info)=>{
    //     info.preventDefault();
    //     let data1;
    //     const fd = new FormData();
    //     fd.append("username",this.state.username);
    //     fd.append("category",this.state.category);
    //     fd.append("description",this.state.description);
    //     fd.append("image",this.state.selectedImage);

    //     const config = {
    //         headers:{
    //             "content-type": "multipart/form-data"
    //         }
    //     }
    
    //     axios.post('http://localhost:3002/uploadpost',fd, config,).then(async resp=>{
            
    //         if(resp.data != "0")
    //         {
    //             console.log("Response in FrontEnd: "+(resp.data));
    //             //console.log( Array.isArray(resp.data));
    //             axios.post('http://localhost:3002/user',localStorage).then(async response=>{
    //                 data1 = resp.data.filter(post=> post.username === response.data.username);
    //                 const temp = await this.setState({"post": data1});
    //                 data = this.state.post;
    //                 console.log("Data Array after clicking Upload Post: ",JSON.stringify(data));
    //                 document.getElementById('err').innerHTML = "*Your post is successfully uploaded";
    //                 document.getElementById('err').style.color = "blue"; 
    //                 console.log("Type of post in state: "+typeof (this.state.post))
    //                 console.log("State after adding posts: "+JSON.stringify(this.state.post));
    //                 document.getElementById('username').value = "";
    //                 document.getElementById('description').value = "";
    //                 document.getElementById('selectedImage').value = "";
    //                 document.getElementById('post-form').style.display = "none";
    //                 setPostForm=0;
    //             })
                
    //         }
    //         else{
    //             document.getElementById('err').innerHTML = "*Error in uploading your post.Please try again";
    //             document.getElementById('err').style.color = "red";
    //         }
    //     })
    // }

    // handleCategory = (info)=>{
    //     info.preventDefault();
    //     const value = document.getElementById('categoryName').value;
    //     console.log("Categories in state now: "+JSON.stringify(this.state.categories)); 
    //     const ctgArray = this.state.categories.map(d=> d.categoryName);
    //     console.log("Categories in ctgArray: "+ctgArray);
    //     if(defaultCategories.indexOf(value) == -1 && ctgArray.indexOf(value) == -1)
    //     {
    //         const fb = new FormData();
    //         fb.append('categoryName',this.state.categoryName);
    //         fb.append('categoryImage',this.state.categoryImage);

    //         const config = {
    //             headers:{
    //                 "content-type": "multipart/form-data"
    //             }
    //         }

    //         axios.post('http://localhost:3002/uploadcategory',fb,config).then(resp=>{
    //             if(resp.data != '0')
    //             {
    //                 console.log("Response at Front End: "+JSON.stringify(resp.data));
    //                 document.getElementById('errCategory').innerHTML = "*This category is successfully uploaded"
    //                 document.getElementById('errCategory').style.color = "blue";
    //                 // defaultCategories.push(resp.data.categoryName);
    //                 // console.log("DefaultCategories: "+defaultCategories);
    //                 this.setState({categories: resp.data});
    //                 console.log("Categories in state: "+this.state.categories);
    //                 document.getElementById('categoryName').value = "";
    //                 document.getElementById('categoryImage').value = "";
    //                 document.getElementById('category-form').style.display = "none";
    //                 setCategoryForm=0;
    //             }
    //             else{
    //                 console.log("Error in uploading category: "+resp.data);
    //             }
    //         })
    //     }
    //     else{
    //         document.getElementById('categoryName').value = "";
    //         document.getElementById('categoryImage').value = "";
    //         document.getElementById('errCategory').innerHTML = "*This category is already there";
    //         document.getElementById('errCategory').style.color = "red";
    //         console.log("DefaultCategories: "+defaultCategories);
    //     }
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


 // axios.get('http://localhost:3002/showcategory').then(resp=>{
            //     if(resp.data != '0')
            //     {
            //         this.setState({categories: resp.data});
            //     }
            //     else{
            //         console.log("Error in fetching categories from BackEnd: "+resp.data);
            //     }
            // })


 {/* <div className="content_rgt">
                        <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a id="uploadpost" onClick={this.handleUpload}>Upload Post</a>
                        </div>
                        <div id="post-form">
                            <form onSubmit={this.handlePost}>
                                <label>
                                    Username: <input id="username" name="username" type="text" placeholder="Username" onChange={this.handleChange} required/>
                                </label>
                                <label>
                                    Category: <select name="category" id="category" onChange={this.handleChange} required>
                                        <option value="Dogs" selected>Dogs</option>
                                        <option value="Cats">Cats</option>
                                        <option value="Birds">Birds</option>
                                        <option value="Rabbits">Rabbits</option>
                                        {this.state.categories.length > 0 ?
                                            this.state.categories.map((d,id)=>
                                                <option value={d.categoryName} key={id} >{d.categoryName}</option>
                                            )  : ""  
                                        }
                                        <option value="Others">Others</option>
                                    </select>
                                </label>
                                <label>
                                    Description:<textarea id="description" name="description" rows="2" placeholder="Caption here.." onChange={this.handleChange} required/>
                                </label>
                                <label>
                                    <input id="image" name="selectedImage" id="selectedImage" type="file" onChange={this.handleChange} required/>
                                </label>
                                <input type="submit" value="Upload"/>
                                <p id="err" style={{color: "red", display: "block"}}></p>
                            </form>
                        </div>
                        <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a id="uploadCategory" onClick={this.handleUploadCategory}>Upload Category</a> </div>
                        <div id="category-form">
                            <form onSubmit={this.handleCategory}>
                                <label>
                                    Category: <input type="text" id="categoryName" name="categoryName" placeholder="Category" onChange={this.handleChange} required/>
                                </label>
                                <label>
                                    <input type="file" name="categoryImage" id="categoryImage" onChange={this.handleChange} required /> 
                                </label>
                                <input type="submit" value="Upload" />
                                <p id="errCategory" style={{color: "red", display: "block"}}></p>
                            </form>
                        </div>
                        <div className="rght_cate">
                        <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                        <div className="rght_list">
                            <ul onClick={this.handleCategoryList}>
                            <li><span className="list_icon"><img src="images/icon_01.png" alt="up" /></span>Cats</li>
                            <li><span className="list_icon"><img src="images/icon_02.png" alt="up" /></span>Dogs</li>
                            <li><span className="list_icon"><img src="images/icon_03.png" alt="up" /></span>Birds</li>
                            <li><span className="list_icon"><img src="images/icon_04.png" alt="up" /></span>Rabbits</li>
                            {
                                this.state.categories.length > 0 ?
                                    this.state.categories.map((d,id)=>
                                        <li key={id}><span className="list_icon"><img src={"http://localhost:3002/"+d.categoryImage} alt="up" height="39px" width="39px" /></span>{d.categoryName}</li>
                                    ) : ""
                            }
                            <li><span className="list_icon"><img src="images/icon_05.png" alt="up" /></span> Others</li>
                            </ul>
                        </div>
                        </div>
                        <div className="rght_cate">
                        <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                        <div className="sub_dwn">
                            <div className="feat_sec">
                            <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                            <div className="feat_txt">Lorem Ipusum Text</div>
                            </div>
                            <div className="feat_sec">
                            <div className="feat_sec_img"><img src="images/feat_img2.png" alt="image" /></div>
                            <div className="feat_txt">Lorem Ipusum Text</div>
                            <div className="btm_rgt">
                                <div className="btm_arc">Dogs</div>
                            </div>
                            </div>
                            <div className="feat_sec">
                            <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
                            <div className="feat_txt">Lorem Ipusum Text</div>
                            <div className="btm_rgt">
                                <div className="btm_arc">Rabbits</div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div> */}    
                    
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