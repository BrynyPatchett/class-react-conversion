import React, { Component } from 'react';

class ClassCount extends Component{
    constructor(props){
        super(props);
        this.state = {
            count:this.props.todos.length
        }
    }

    render(){
        return(
            <>
            <h3>Number of ToDos: {this.props.todos.length} </h3>
            </>
        )
    }
}

export default ClassCount;