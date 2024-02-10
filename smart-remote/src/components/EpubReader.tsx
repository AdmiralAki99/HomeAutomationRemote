import React from "react";

import { ReactReader } from 'react-reader'



class EpubReader extends React.Component {

    state = {
        location: "0"
    }

    constructor(props: any) {
        super(props);
    }

    renderReader() {
        return (
            <div style={{ height: "95vh"}}>
            <ReactReader
              url="https://react-reader.metabits.no/files/alice.epub"
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