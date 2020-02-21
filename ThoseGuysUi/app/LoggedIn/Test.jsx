import React from 'react';

export default class Test extends React.Component{
    constructor(props)
    {
        super(props)
        console.log("coming from test")
    }
    render(){
        return(
            <div>
                hi
            </div>
        )
    }
}