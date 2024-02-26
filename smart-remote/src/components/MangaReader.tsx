import React from "react";
import axios from "axios";

interface MangaReaderProop{
  volumeLocation : string;
}

class MangaReader extends React.Component<MangaReaderProop>{

    constructor(props : MangaReaderProop){
        super(props);
    }

    fetchNewTitles(){
      axios.post('/manga/search',{
        'title' : ''
      }).then((resp)=>{
        console.log(resp);
      })
    }

    componenetDidMount(){
      console.log('MangaReader mounted');
      this.fetchNewTitles()
    }

    renderChapter(){

    }

    render(){
        return(
            <div>
              <button onClick={()=>this.fetchNewTitles()}>Fetch</button>
            </div>
        )
    }
}

export default MangaReader;