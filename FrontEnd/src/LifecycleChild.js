import React from 'react';

export class LifecycleChild extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color: "red"
        }
        console.log("You are ini constructor child");
    }

    static getDerivedStateFromProps = ()=>{
        console.log("you'r in getderivestatewfromprops child");
    }

    render(){
        console.log("You'r in render() child");
        console.log("State in child comp: "+JSON.stringify(this.state))
        return <h1>Welcome in Child component</h1>
    }

    componentDidMount = ()=>{
        console.log("You'r in componentDidMount child");
    }

    shouldComponentUpdate(){
        console.log("welcome in shouldComponentUpdate child");
        return true;
    }

    componentDidUpdate(){
        console.log("You'r in componentDidUpdate child");
    }
}