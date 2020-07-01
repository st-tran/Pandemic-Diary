import React from "react";

class ImageIcon extends React.Component {
    Image = {
        type: "image",
        img: new Image(),
        width: 16,
        height: 24,
        content: <img alt=""></img>,
    };

    componentWillUnmount() {
        Image.img = undefined;
    }

    render() {
        const marker = (
            <img
                alt="_image"
                style={this.props.style}
                src="/image.png"
                onClick={() => {
                    this.props.onClick(this.Image);
                }}
            />
        );
        const img = this.Image.img;
        if (img.src) {
            return marker;
        } else {
            if (!img.complete) {
                img.onload = () => {
                    img.src = "/happy_face.png";
                    return marker;
                };
            } else {
                img.src = "happy_face.png";
                return marker;
            }
        }
    }
}

class ImageMenu extends React.Component {
    submitImage(e) {
        //TODO this seems like a messy implementation the content probably should not be an img but the default was placed as an img object so idk
        //need to check that the file being passed is actually an image file - appears that photo just wont show if wrong file but still
        const imgUrl = URL.createObjectURL(e.target.files[0]);
        this.props.currentShareable.content = <img style={{maxWidth: '90%', maxHeight: '90%'}} src={imgUrl} alt=""/>
    }

    render() {
        return (
            <div style={{ textAlign: "left" }}>
                <h1>Image Selector</h1>
                <p>
                    Select an image to add to this image marker you've placed. It will be displayed
                    when you hover over the marker.
                </p>
                <form action="image upload">
                    <input
                        type="file"
                        name="fileupload"
                        id="fileupload"
                        onChange={this.submitImage.bind(this)}
                    />
                </form>
            </div>
        );
    }
}

export { ImageIcon, ImageMenu };
