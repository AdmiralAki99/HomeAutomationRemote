import React from "react";

interface CameraFeedPlayerState{
    url : string
}

interface CameraFeedPlayerProps{
    url : string
}

class CameraFeedPlayer extends React.Component<CameraFeedPlayerState>{

    state : CameraFeedPlayerState = {
        url : ''
    }

    // Change the Properties To A Interface and remove ambiguous data types
    constructor(props:CameraFeedPlayerProps){
        super(props)
        this.state = {
            url : props.url
        }


    }

    renderFeed(){
        return(
            <div>
                <img src={this.state.url} />
            </div>
        )
    }

    render(){
        return(
            <div>
                {this.renderFeed()}
            </div>
        )
    }
}

export default CameraFeedPlayer;