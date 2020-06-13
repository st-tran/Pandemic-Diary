import React, { useState } from "react";
import './styles.css';

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            start: new Date("December 1 2019"),
            end: new Date("December 31 2020"),
            current: new Date(),
            selected: '',
            hover: false,
            width: 0,
            height: 0
        }
    }

    updateDimensions = () => {
        this.setState({
            height: 60,
            width: window.innerWidth
        })
        this.updateCanvas();
    }
    
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.updateCanvas();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateCanvas() {
        const ctx = this.refs.timeline.getContext("2d");

        // x and y padding for the timeline canvas.
        const xpad = 4;
        const ypad = 2;
        // horizontal spacing between vertical ticks on the timeline.
        const xspace = 5;

        // Workable space for the timeline.
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height -= 2*ypad;
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;
        

        // Calculate number of days between start and end.
        const daysBetween = Math.round(Math.abs((this.state.end - this.state.start) / (24*60*60*1000)));

        ctx.lineWidth = 1;
        // Draw vertical ticks every 5px of the timeline width.
        for (let i = 0; i < Math.floor(width / xspace); i += xspace) {
            ctx.fillRect(2+i*5, 0, 0.5, height);
            
            // console.log(i*5);
        }
        ctx.fillRect(0, height/2, width, 3);
        this.forceUpdate();
    }

    toggleHover() {
        this.setState({
            hover: !this.state.hover
        });
        console.log(this.state.hover);
        
    }

    render() {
        return(
            <canvas ref="timeline" onMouseEnter={this.toggleHover} className="timeline"/>
        );
    };
}

export default Timeline;
