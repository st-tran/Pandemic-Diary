import React from "react";
import "./style.css";

class MarkerIcon extends React.Component {
    state = {
        type: "marker",
        img: new Image(),
        width: 16,
        height: 24,
        content: "",
        date: new Date(), 
        id: '',
    };

    componentWillUnmount() {
        Image.img = undefined;
    }

    render() {
        const marker = (
            <img
                style={this.props.style}
                src="/marker.png"
                onClick={() => {
                    this.props.onClick(this.state);
                }}
            />
        );
        const img = this.state.img;
        if (img.src) {
            return marker;
        } else {
            if (!img.complete) {
                img.onload = () => {
                    img.src = "/marker.png";
                    return marker;
                };
            } else {
                img.src = "/marker.png";
                return marker;
            }
        }
    }
}

class MarkerMenu extends React.Component {
    render() {
        return (
            <div className ="addContext">
                <h1>Edit your marker!</h1>
                <p>
                    You may enter text you'd like your marker to display here. There is a limit of
                    100 characters.
                </p>
                <input
                    type="text"
                    maxLength="100"
                    onChange={(e) => {
                        this.props.state.content = e.target.value
                    }}
                />

                <div className="dateSection">
                    <input type="date" defaultValue="2019-01-01" min="2019-01-01" max="2020-12-31"/>
                </div>
            </div>
        );
    }
}

export { MarkerIcon, MarkerMenu };
