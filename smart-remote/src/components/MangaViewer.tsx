import React from "react";
import axios from "axios";

import { Modal,Box,Divider,Typography } from "@mui/material";
import AutoStories from "@mui/icons-material/AutoStories";
import SaveIcon from "@mui/icons-material/Save";


import MangaReader from "./MangaReader";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
  };

interface MangaViewerComponentProps {
    isOpen : boolean;
    closeModal : ()=>void;
    selectedManga : any;
    chapterList : any;
}

class MangaViewerComponent extends React.Component<MangaViewerComponentProps> {
    state = {
        chapterList : [{}],
        isOpen : false,
        readerOpen : false,
        totalPages : 0,
        currentPage : 0,
        mangaID : '',
        chapterID : '',
        chapterPageCount : 0,
        scrollPosition : 0,
        readerLoading : false,
    }

    constructor(props: MangaViewerComponentProps) {
        super(props);
        this.state = {
            chapterList: props.chapterList,
            isOpen: props.isOpen,
            readerOpen: false,
            totalPages: 0,
            currentPage: 0,
            mangaID: props.selectedManga.id,
            chapterID: '',
            chapterPageCount: 0,
            scrollPosition: 0,
            readerLoading: false,
        }
    }

    getPage = async (mangaID:string,chapterID:string,pageNumber:number) => {
      try{
       let resp = await axios.get(`/manga/post/${mangaID}/${chapterID}/${pageNumber}`,{responseType: 'arraybuffer'})
        let blob = new Blob([resp.data],{type:resp.headers['content-type']})
        let imgSrc = URL.createObjectURL(blob)
        this.setState({pageSrc: imgSrc,currentPage:pageNumber})
      } catch(e){
        console.log('Error importing chapter')
      }
    }

    downloadChapter = async (mangaID:string,chapterID:string) => {
      try{
        let resp = await axios.post('/manga/get/download',{mangaId:mangaID,chapterId:chapterID})
        await this.getPage(mangaID,chapterID,0)
        this.openReader()
      }catch(e){
        console.log('Error downloading chapter')
      }
    }

    openReader(){
        this.setState({
            readerOpen : true
        })
    }

    closeReaderModal = () => {
      this.setState({readerOpen: false})
    }

    render() {
        return (
          <div>
            <Modal
              open={this.state.isOpen}
              onClose={this.props.closeModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="flex overflow-x-scroll overflow-y-scroll no-scrollbar">
                <Box sx={style}>
                  <div className="flex flex-row">
                    <img
                      src={this.props.selectedManga.coverArt}
                      width="80px"
                      height="80px"
                    ></img>
                    <div className="flex flex-col pl-5">
                      <Typography variant="h5">
                        {this.props.selectedManga.title}
                      </Typography>
                      <p className="text-justify max-w-82 max-h-20 overflow-y-clip">
                        {this.props.selectedManga.description != undefined
                          ? `${this.props.selectedManga.description.en}`
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-y-auto">
                    <table className="table overflow-y-auto h-600">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Chapter</th>
                          <th>Volume</th>
                          <th>Pages</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {this.state.chapterList.map((chapter: any) => {
                          return (
                            <tr>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 text-ellipsis w-100">
                                {chapter.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {chapter.chapter}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {chapter.volume}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {chapter.pages}
                              </td>
                              <td className="flex items-center justify-center w-full h-full px-6 py-4">
                                <button
                                  className="pr-2"
                                  onClick={() => {
                                    this.downloadChapter(
                                      this.props.selectedManga.id,
                                      chapter.id
                                    );
                                    this.setState({
                                      chapterID: chapter.id,
                                      totalPages: chapter.pages,
                                      readerOpen: true,
                                    })
                                  }}
                                >
                                  <AutoStories sx={{color : "black", fontSize: "large"}} />
                                </button>
                                <Divider orientation="vertical" flexItem />
                                <button className="pl-2"><SaveIcon sx={{color:"black", fontSize: "large"}}/></button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Box>
              </div>
            </Modal>
            {this.state.readerOpen == true? <MangaReader open={this.state.readerOpen} totalPages={this.state.totalPages} currentPage={this.state.currentPage} mangaID={this.state.mangaID} chapterID={this.state.chapterID} onClose={this.closeReaderModal}  /> : <div></div>}
          </div>
        );
    }
}

export default MangaViewerComponent;