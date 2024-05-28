import React from "react";
import axios from "axios";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import CloseFullscreen from "@mui/icons-material/CloseFullscreen";

interface MangaReaderProp{
  totalPages : number
  open : boolean
  currentPage : number,
  mangaID : string,
  chapterID : string,
  onClose : () => void
}

const readerStyle = {
  width: 600,
  height: 900,
  bgcolor: 'background.paper',
  overflow: 'scroll'
};


class MangaReader extends React.Component<MangaReaderProp>{

  state = {
    readerOpen : false,
    pageSrc : '',
    totalPages : 0,
    open : false,
    currentPage : 0,
    mangaID : '',
    chapterID : ''
  }

    openReaderModal(){
      this.setState({
        readerOpen : true
      })
    }

    async nextPage(){
      if (this.state.currentPage >= this.state.totalPages - 1){
        return
      }
  
      this.state.currentPage = this.state.currentPage + 1
      await this.getPage(this.state.mangaID,this.state.chapterID)
    }

    async prevPage(){
      if (this.state.currentPage <= 0){
        return
      }
  
      this.state.currentPage = this.state.currentPage - 1
      this.getPage(this.state.mangaID,this.state.chapterID)
    }

  constructor(props : MangaReaderProp){
      super(props);
      this.state = {
        readerOpen : props.open,
        pageSrc : '',
        totalPages : props.totalPages,
        open : props.open,
        currentPage : props.currentPage,
        mangaID : props.mangaID,
        chapterID : props.chapterID
      }

      this.openReaderModal = this.openReaderModal.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.prevPage = this.prevPage.bind(this);
      this.getPage = this.getPage.bind(this);
    }

    componentDidMount(): void {
      this.getPage(this.state.mangaID,this.state.chapterID);
    }

    getPage = async (mangaID:string,chapterID:string) => {
      try{
       let resp = await axios.get(`/manga/post/${this.state.mangaID}/${this.state.chapterID}/${this.state.currentPage}`,{responseType: 'arraybuffer'})
        let blob = new Blob([resp.data],{type:resp.headers['content-type']})
        let imgSrc = URL.createObjectURL(blob)
        this.setState({
          pageSrc : imgSrc
        })
      } catch(e){
        console.log('Error importing chapter')
      }
    }

    render(){
        return (
          <div>
            <Modal
              open={this.state.readerOpen}
              onClose={() => {
                this.state.readerOpen = false;
                this.props.onClose();
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={readerStyle}>
                <div className="flex flex-nowrap h-9 justify-end items-center overflow-hidden bg-noir">
                  <button
                    onClick={() => {
                      this.state.readerOpen = false;
                      this.props.onClose();
                    }}
                  >
                    <CloseFullscreen sx={{ color: "white", fontSize: "large" }} />
                  </button>
                </div>
                <div className="relative z-0 items-center justify-center">
                  <LinearProgress
                    variant="determinate"
                    value={(this.state.currentPage / (this.state.totalPages - 1)) * 100} color="secondary"
                    sx={{height:"7px"}} ></LinearProgress>
                  <img src={this.state.pageSrc} width={600} height={200}></img>
                  <div className="grid grid-rows-1 grid-cols-2 justify-center items-center h-full absolute inset-0 z-10">
                    <div className=" flex h-full bg-transparent items-center justify-center">
                      <button
                        className="h-full w-full"
                        onClick={this.prevPage}
                      ></button>
                    </div>
                    <div className="flex h-full bg-transparent items-center justify-center">
                      <button
                        className="h-full w-full"
                        onClick={this.nextPage}
                      ></button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        );
    }
}

export default MangaReader;