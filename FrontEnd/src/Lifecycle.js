import React from 'react';
import { LifecycleChild } from './LifecycleChild';

export class Lifecycle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color: "blue"
        }
        console.log("You are ini constructor");
    }

    static getDerivedStateFromProps = ()=>{
        console.log("you'r in getderivestatewfromprops");
    }

    componentDidMount = ()=>{
        console.log("You'r in componentDidMount");
    }

    componentDidUpdate(){
        console.log("You'r in componentDidUpdate");
    }

    shouldComponentUpdate(){
        console.log("welcome in shouldComponentUpdate");
        // return true;
    }

    handleChange = (e)=>{
        this.setState({color: e.target.value});
    }

    render(){
        console.log("You'r in render()");
        return (
            <div>
                <h1>Welcome</h1>
                <input type="text" name="color" onChange={this.handleChange}/>
                <LifecycleChild color={this.state.color}/>
            </div>
            
        )
    }

    
}