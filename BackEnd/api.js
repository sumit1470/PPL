const userdb = require('./RegisterSchema');
const postdb = require('./PostSchema');
const categorydb = require('./CategorySchema');

module.exports = {
    findUsername: (data)=>{
        return new Promise((resolve,reject)=>{
            userdb.findOne({username: data.username},(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        })
    },

    findEmail: (data)=>{
        return new Promise((resolve,reject)=>{
            userdb.findOne({email: data.email},(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
        });
    },

    findPassword: (data)=>{
        return new Promise((resolve,reject)=>{
            userdb.findOne({email: data.email,password: data.password},(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    },

    registerUser: (data)=>{
        return new Promise((resolve,reject)=>{
            userdb.create(data,(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        })
    },

    uploadPost: (data)=>{
        return new Promise((resolve,reject)=>{
            postdb.create(data, (err,result)=>{
                if(err){
                    reject(err);
                }else{
                    postdb.find({},(err,res)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(res);
                        }
                    })
                    
                }
            })
        });
    },

    uploadCategory: (data)=>{
        return new Promise((resolve,reject)=>{
            categorydb.create(data,(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    categorydb.find({},(err, result)=>{
                        if(err)
                        {
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    })
                }
            })
        })
    },

    findPost: (data)=>{
        return new Promise((resolve,reject)=>{
            postdb.findOne({image: data.image, username: data.username},(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    // resolve(result);
                    if(result.likes.indexOf(data.email)==-1){
                        postdb.updateOne({image: data.image, username: data.username},{$push: {likes: data.email}},(err,result)=>{
                            if(err){
                                reject(err);
                            }else{
                               postdb.find({},(err,result)=>{
                                   if(err){
                                       reject(err);
                                   }
                                   else{
                                       resolve(result)
                                    }
                               })
                            }
                        })
                    }
                    else{
                        postdb.updateOne({image: data.image, username: data.username},{$pull: {likes: data.email}},(err,result)=>{
                            if(err){
                                reject(err);
                            }else{
                                // resolve('0');
                                postdb.find({},(err,result)=>{
                                    if(err){
                                        reject(err);
                                    }
                                    else{
                                        resolve(result);
                                     }
                                })
                            }
                        })
                    }

                }
            })
        })
    },

    uploadComment: (data)=>{
        return new Promise((resolve,reject)=>{
            postdb.findOne({image: data.image, username: data.username},(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    console.log("Result of findComment: "+result);
                    const nos = result.comments.length.toString();
                    if(!result.comments.some(comment => comment.email===data.email && comment.text===data.text)){
                        postdb.updateOne({image: data.image, username: data.username},
                            {$push: 
                                {comments: 
                                    {email: data.email, text: data.text, replies: data.replies,no: nos }}},
                                    (err,result)=>{
                                        if(err){
                                            reject(err);
                                        }else{
                                            postdb.findOne({image: data.image, username: data.username},
                                                (err,result)=>{
                                                    if(err){
                                                        reject(err);
                                                    }else{
                                                        resolve(result);
                                                    }
                                                })
                                        }
                                    })
                    }
                    else{
                        resolve('0');
                    }
                }
            })
        })
    },

    uploadReply: (data)=>{
        return new Promise((resolve,reject)=>{
            postdb.findOne({image: data.image, username: data.username},(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    const nos = data.comment;
                    if(result.comments[data.comment].replies!=undefined && !result.comments[data.comment].replies.some(c => c.email===data.email && c.text===data.text)){
                        postdb.update({image: data.image, username: data.username},
                            {$push: 
                                {'comments.$[element].replies': 
                                    {email: data.email, text: data.text}}},
                            {arrayFilters: [{"element.no": data.comment}]},
                            (err,result)=>{
                                        if(err){
                                            reject(err);
                                        }else{
                                            postdb.findOne({image: data.image, username: data.username},
                                                (err,result)=>{
                                                    if(err){
                                                        reject(err);
                                                    }else{
                                                        resolve(result);
                                                    }
                                                })
                                        }
                                    })
                    }
                    else{
                        resolve('0');
                    }
                }
            })
        })
    },

    // deleteComment: (data)=>{
    //     return new Promise((resolve,reject)=>{
    //         postdb.findOne({image: data.image, username: data.username},(err,result)=>{
    //             if(err){
    //                 reject(err);
    //             }else{
    //                 postdb.updateOne({image: data.image,username: data.username},
    //                     {$pull:
    //                         {comments: {no: data.no} }},
    //                         (err,result)=>{
    //                             if(err){
    //                                 reject(err);
    //                             }else{
    //                                 postdb.findOne({image: data.image, username: data.username},(err,result)=>{
    //                                     if(err){
    //                                         reject(err);
    //                                     }else{
    //                                         resolve(result);
    //                                     }
    //                                 })
    //                             }
    //                         })
    //             }
    //         })
    //     })
    // }

}