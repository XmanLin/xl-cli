// react.jsx  file
module.exports = function (className) {
    return `
import * as React from 'react';

export class ${className} extends React.Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    componentDidMount(){

    }

    render() {
        return (
            <div></div>
        )
    }
}
    ` 
}