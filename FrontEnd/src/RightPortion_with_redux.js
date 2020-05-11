import React from 'react';
import axios from 'axios';
import {config} from './Utils';
import { connect } from 'react-redux';
import { postUploaded, categoryUploaded } from './js/actions/index';

const mapStateToProps = state=>{
    return {categories: state.categories};
}

let setPostForm=0;
let setCategoryForm=0;
let data;
let defaultCategories = ['Dogs', 'Cats', 'Birds', 'Rabbits', 'Others'];
let name;
export class RightPortion1 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            category: "Dogs",
            description: "",
            selectedImage: "",
            categoryName: "",
            categoryImage: "",
        }
    }

    handleUpload=()=>{
        if(setPostForm == 0 )
        {
            document.getElementById('post-form').style.display = "block";
            setPostForm= 1;
            document.getElementById('category-form').style.display = "none";
            setCategoryForm=0;
            console.log("Check setPostForm value:", setPostForm );
        }
        else if(setPostForm == 1){
            document.getElementById('post-form').style.display = "none";
            setPostForm=0;
            console.log("Check setPostForm value:", setPostForm);
        }
    }

    handleUploadCategory = ()=>{
        if(setCategoryForm == 0 )
        {
            document.getElementById('category-form').style.display = "block";
            setCategoryForm= 1;
            document.getElementById('post-form').style.display = "none";
            setPostForm=0;
            console.log("Check setCategoryForm value:", setCategoryForm );
        }
        else if(setCategoryForm == 1){
            document.getElementById('category-form').style.display = "none";
            setCategoryForm=0;
            console.log("Check setCategoryForm value:", setCategoryForm);
        }
    }

    handlePost=(info)=>{
        info.preventDefault();
        const fd = new FormData();
        fd.append("username",this.state.username);
        fd.append("category",this.state.category);
        fd.append("description",this.state.description);
        fd.append("image",this.state.selectedImage);
    
        console.log("Form data in upload post: "+JSON.stringify(fd));
        axios({
            method: 'post',
            url: config.SERVER_URL+config.ROUTES.UPLOADPOST,
            data: fd,
            headers:{
                "content-type": "multipart/form-data"
            }
        }).then(async resp=>{
            
            if(resp.data != "0")
            {
                console.log("Response in FrontEnd: "+(resp.data));
                    this.props.postUploaded(resp.data);
                    data = this.state.post;
                    console.log("Data Array after clicking Upload Post: ",JSON.stringify(data));
                    document.getElementById('err').innerHTML = "*Your post is successfully uploaded";
                    document.getElementById('err').style.color = "blue"; 
                    console.log("Type of post in state: "+typeof (this.state.post))
                    console.log("State after adding posts: "+JSON.stringify(this.state.post));
                    document.getElementById('username').value = "";
                    document.getElementById('description').value = "";
                    document.getElementById('selectedImage').value = "";
                    document.getElementById('post-form').style.display = "none";
                    setPostForm=0;
                // })
                
            }
            else{
                document.getElementById('err').innerHTML = "*Error in uploading your post.Please try again";
                document.getElementById('err').style.color = "red";
            }
        })
    }

    handleChange = (e)=>{
        if(e.target.name!="selectedImage" && e.target.name!="categoryImage")
        {
            this.setState({[e.target.name]: e.target.value});
            console.log('Name of state: '+e.target.name);
            console.log('Value of state: '+e.target.value);
        }
        else{
            console.log(e.target.files[0]);
            this.setState({[e.target.name]: e.target.files[0]});
            console.log("Name of the state: "+e.target.name);
            console.log("Value of the state: "+e.target.files[0]);
            
        }
    }

    handleCategory = (info)=>{
        info.preventDefault();
        const value = document.getElementById('categoryName').value;
        console.log("Categories in state now: "+JSON.stringify(this.state.categories)); 
        const ctgArray = this.state.categories.map(d=> d.categoryName);
        console.log("Categories in ctgArray: "+ctgArray);
        if(defaultCategories.indexOf(value) == -1 && ctgArray.indexOf(value) == -1)
        {
            const fb = new FormData();
            fb.append('categoryName',this.state.categoryName);
            fb.append('categoryImage',this.state.categoryImage);

            const config = {
                headers:{
                    "content-type": "multipart/form-data"
                }
            }

            axios({
                method: 'post',
                url: config.SERVER_URL+config.ROUTES.UPLOADCATEGORY,
                data: fb,
                headers:{
                    "content-type": "multipart/form-data"
                }
            }).then(resp=>{
                if(resp.data != '0')
                {
                    console.log("Response at Front End: "+JSON.stringify(resp.data));
                    document.getElementById('errCategory').innerHTML = "*This category is successfully uploaded"
                    document.getElementById('errCategory').style.color = "blue";
                
                    this.props.categoryUploaded(resp.data);
                    console.log("Categories in state: "+this.state.categories);
                    document.getElementById('categoryName').value = "";
                    document.getElementById('categoryImage').value = "";
                    document.getElementById('category-form').style.display = "none";
                    setCategoryForm=0;
                }
                else{
                    console.log("Error in uploading category: "+resp.data);
                }
            })
        }
        else{
            document.getElementById('categoryName').value = "";
            document.getElementById('categoryImage').value = "";
            document.getElementById('errCategory').innerHTML = "*This category is already there";
            document.getElementById('errCategory').style.color = "red";
            console.log("DefaultCategories: "+defaultCategories);
        }
    }

    componentDidMount =()=>{
        axios({
            method: 'get',
            url: config.SERVER_URL+config.ROUTES.SHOWCATEGORY
        }).then(resp=>{
                if(resp.data != '0')
                {
                    this.props.categoryUploaded(resp.data);
                    this.setState({categories: resp.data});
                }
                else{
                    console.log("Error in fetching categories from BackEnd: "+resp.data);
                }
            })
    }

    render() {
        return (
            <div className="content_rgt">
                        <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a id="uploadpost" onClick={this.handleUpload}>Upload Post</a>
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
                                        {this.props.categories.length > 0 ?
                                            this.props.categories.map((d,id)=>
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
                        <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a id="uploadCategory" onClick={this.handleUploadCategory}>Upload Category</a> </div>
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
                            <ul onClick={this.props.categoryList}>
                            <li><span className="list_icon"><img src="/images/icon_01.png" alt="up" /></span>Cats</li>
                            <li><span className="list_icon"><img src="/images/icon_02.png" alt="up" /></span>Dogs</li>
                            <li><span className="list_icon"><img src="/images/icon_03.png" alt="up" /></span>Birds</li>
                            <li><span className="list_icon"><img src="/images/icon_04.png" alt="up" /></span>Rabbits</li>
                            {
                                this.props.categories.length > 0 ?
                                    this.props.categories.map((d,id)=>
                                        <li key={id}><span className="list_icon"><img src={"http://localhost:3002/"+d.categoryImage} alt="up" height="39px" width="39px" /></span>{d.categoryName}</li>
                                    ) : ""
                            }
                            <li><span className="list_icon"><img src="/images/icon_05.png" alt="up" /></span>Others</li>
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
                </div>
        )
    }
}

export default connect(mapStateToProps, { postUploaded, categoryUploaded })(RightPortion1);