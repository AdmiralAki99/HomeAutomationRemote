import React from "react";

import Divider from '@mui/material/Divider';
import axios from "axios";
import MangaViewerComponent from "./MangaViewer";


interface SearchResultComponentProps {
    searchResults: any;
}

class SearchResultComponent extends React.Component<SearchResultComponentProps> {

    state: {
        searchResults: any;
        viewerOpen: boolean;
        selectedManga: any;
        chapterList: any;
    }

    constructor(props: SearchResultComponentProps) {
        super(props);
        this.state = {
            searchResults: props.searchResults,
            viewerOpen: false,
            selectedManga: {},
            chapterList: [{}]
        }
    }

    openViewerModal = () => {
        this.setState({
            viewerOpen: true
        })
    }

    closeViewerModal = () => {
        this.setState({
            viewerOpen: false
        })
    }

    getMangaChapterList = async ()=>{
        try{
          let resp = await axios.post('/manga/get/chapters',{id:this.state.selectedManga.id})
          this.setState({chapterList: resp.data})
          return resp.data
        }catch(e){
          console.log('Error fetching manga chapter list')
        }
      }

    render() {
        return (
          <>
            <div className=" translate-x-20 overflow-x-clip w-3/4">
              <div>
                {this.state.searchResults.map((manga: any) => {
                  return (
                    <button
                      className="w-full pb-1"
                      onClick={async () => {
                        this.state.selectedManga = manga;
                        await this.getMangaChapterList();
                        this.openViewerModal();
                      }}
                    >
                      <div className="grid grid-rows-1 grid-cols-2 w-full h-1/5 bg-white border-2 border-noir gap-0.5 rounded-xl">
                        <div>
                          <img
                            src={manga.coverArt}
                            width={60}
                            height={60}
                            className="rounded-xl"
                          />
                        </div>
                        <div className="grid grid-cols-1 text-black">
                          <div>{manga.title}</div>
                          <div>Subtitle</div>
                        </div>
                        {/* <Divider/> */}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            {this.state.viewerOpen ? <div><MangaViewerComponent isOpen={this.state.viewerOpen} closeModal={this.closeViewerModal} selectedManga={this.state.selectedManga} chapterList={this.state.chapterList} /></div>:<div></div>}
          </>
        );
  }
}

export default SearchResultComponent;