import React from "react";
import {XMLParser} from 'fast-xml-parser';

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

    parseEpub = async () => {
      try{
        // const xmlInfo = fs.readFileSync(this.state.bookLocation, 'utf8');
        // console.log(xmlInfo);
        // return xmlInfo;
      }catch(e){
        console.log(e);
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