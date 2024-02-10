import React from "react";

import { ReactReader } from 'react-reader'

interface EpubReaderProps{
    bookLocation : string;
}

class EpubReader extends React.Component<EpubReaderProps> {

    state = {
        location: "0",
        bookLocation: ''
    }

    constructor(props: EpubReaderProps) {
        super(props);
        this.state = {
            location: "0",
            bookLocation:this.props.bookLocation
        }
    }

    renderReader() {
        return (
            <div style={{ height: "95vh"}}>
            <ReactReader
              url={this.state.bookLocation}
              location={this.state.location}
              locationChanged={(epubcfi: string) => this.setState({location: epubcfi})}
            />
          </div>
        );
    }

    render() {
        return (
          <div>
            {this.renderReader()}
          </div>
        );
  }
}

export default EpubReader;