import React from "react";

interface CameraCardProps{
    cameraName: string;
    cameraUrl: string;
}

class CameraCard extends React.Component<CameraCardProps>{

    state : CameraCardProps = {
        cameraName: '',
        cameraUrl: ''
    }

    constructor(props:CameraCardProps){
        super(props)
        this.state = {
            cameraName: this.props.cameraName,
            cameraUrl: this.props.cameraUrl
        }
    }

    componentDidMount(): void {
        
    }

    componentDidUpdate(prevProps: Readonly<CameraCardProps>, prevState: Readonly<{}>, snapshot?: any): void {
        
    }

    renderTitle(){
        return(
            <div>
                {this.state.cameraName}
            </div>
        )
    }

    renderActionButtons(){
        return(
            <div>
                <button>View</button>
                <button>Record</button>
                <button>Snapshot</button>
            </div>
        )
    }

    render(){
        return(
            <div>
                {this.renderTitle()}
                {this.renderActionButtons()}
            </div>
        )
    }
}