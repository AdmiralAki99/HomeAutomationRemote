import React from "react";

import Divider from '@mui/material/Divider';


interface SearchResultComponentProps {
    searchResults: any;
}

class SearchResultComponent extends React.Component<SearchResultComponentProps> {

    state: {
        searchResults: any;
    }

    constructor(props: SearchResultComponentProps) {
        super(props);
        this.state = {
            searchResults: props.searchResults
        }
    }

    render() {
        return (
          <div>
            <div>
              {this.state.searchResults.map((manga: any) => {
                return (
                  <button
                    className="w-full"
                    onClick={() => {
                      // this.state.selectedManga = manga;
                      // this.getMangaChapterList();
                      // this.mangaChapterPopUp();
                    }}
                  >
                    <div className="grid grid-rows-1 grid-cols-2 w-full h-1/5 bg-white border-2 border-white gap-0.5">
                      <div>
                        <img src={manga.coverArt} width={60} height={60} />
                      </div>
                      <div className="grid grid-cols-1 text-black">
                        <div>{manga.title}</div>
                        <div>Subtitle</div>
                      </div>
                      <Divider />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
  }
}

export default SearchResultComponent;