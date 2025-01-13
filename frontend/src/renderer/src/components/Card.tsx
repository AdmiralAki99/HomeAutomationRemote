import React from "react";
import {ChevronRight} from 'react-bootstrap-icons';

export type CardProps = {
    title: string,
    subtitle: string,
    navigation: any,
    route: string,
    icon: any
}

class Card extends React.Component<CardProps> {
    constructor(props : CardProps) {
        super(props);
    }

  render() {
    return (
      <a className="block max-w-lg w-80 h-auto bg-noir rounded-lg shadow relative">
                <div className="grid grid-rows-3 max-h-40 grid-flow-col gap-4">
                  {/* Left Section of the Card */}
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-bg border-r border-r-white">
                    <button>
                      {this.props.icon}
                    </button>
                  </div>
                  {/* Title Section of the Card */}
                  <div className="row row-start-1 w-40 items-center bg-noir mb-auto">
                    <div className="flex flex-col-2">
                      <div className="font-bold tracking-tight text-primary_text pt-4 pr-4 break-words" style={{fontSize: '3.2rem', lineHeight: '1'}}>
                        {this.props.title}
                      </div>
                    </div>
                    <p className="text-primary_text pt-6">{this.props.subtitle}</p>
                  </div>
                  {/* Button Section of the Card */}
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-primary">
                    <button onClick={()=>this.props.navigation.navigate(this.props.route)}>
                      <ChevronRight color="white"/>
                    </button>
                  </div>
                </div>
        </a>
    );
  }
}

export default Card;