import React from 'react';
import axios from 'axios';

import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';
import {ScreenNavbar } from '../components/Navbar';
import { KeyboardComponent } from '../components/KeyboardComponent';
import MangaReader from '../components/MangaReader';
import SearchResultComponent from '../components/SearchResultComponent';
import MangaViewerComponent from '../components/MangaViewer';
import { motion } from 'framer-motion';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

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
  overflow: 'scroll'
};

const readerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 900,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll'
};


type mangaProps = {
  navigation: NativeStackScreenProps<ScreenParamList, 'Manga'>
}

interface GenreRow{
  genre: string;
  manga: any[];
}

interface MangaScreenStateType {
  mangaFeed: any[];
  genre: GenreRow[];
  randomGenres: any[];
  handleOpen: boolean;
  handleClose : boolean;
  selectedManga: any;
  chapterList: any[];
  readerOpen: boolean;
  readerClose: boolean;
  pageSrc: string;
  currentPage: number;
  currentChapter: string;
  chapterPageCount: number;
  searchResultsOpen: boolean;
  searchResults: any[];
  searchInput: string;
  inputFocused: boolean;
}

class MangaScreen extends React.Component<mangaProps> {
  state : MangaScreenStateType = {
    mangaFeed: [],
    randomGenres: [],
    genre: [],
    handleOpen: false,
    handleClose: false,
    selectedManga: {},
    chapterList: [],
    readerOpen: false,
    readerClose: false,
    pageSrc: '',
    currentPage: 0,
    currentChapter: '',
    chapterPageCount: 0,
    searchResultsOpen: false,
    searchResults: [],
    searchInput: '',
    inputFocused: false
  }

  componentDidMount(): void {
    let mangaFeed = this.getMangaFeed();
    let randomGenres = this.getRandomGenreInParallel();
    Promise.all([mangaFeed, randomGenres]).then((values) => {
      this.setState({mangaFeed: values[0], randomGenres: values[1]})
    })
  }

  useEffect = () => {
    
  }

  constructor(props: any){
    super(props);
    this.getMangaFeed = this.getMangaFeed.bind(this);
    this.getRandomGenreInParallel = this.getRandomGenreInParallel.bind(this);
    this.mangaChapterPopUp = this.mangaChapterPopUp.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getMangaChapterList = this.getMangaChapterList.bind(this);
    this.downloadChapter = this.downloadChapter.bind(this)
    this.openReaderModal = this.openReaderModal.bind(this)
    this.closeReaderModal = this.closeReaderModal.bind(this)
    this.getPage = this.getPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.closeSearchResults = this.closeSearchResults.bind(this)
    this.openSearchResults = this.openSearchResults.bind(this)
    this.onHide = this.onHide.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  getMangaFeed = async () => {
    try{
      const resp = await axios.post('/manga/search',{'title':''})
      return resp.data
    }
    catch(e){
      console.log('Error fetching manga feed')
    }
  }

  searchManga = async (title:string) => {
    try{
      const resp = await axios.post('/manga/search',{'title':title})
      this.setState({searchResults: resp.data})
    }catch(e){
      console.log('Error searching manga')
    }
  }

  getRandomGenreInParallel = async () => {
      try{
         const resp = await Promise.all([
          await fetch('/manga/get/random',{method:'GET'}).then((resp)=>resp.json()),
          await fetch('/manga/get/random',{method:'GET'}).then((resp)=>resp.json()),
          await fetch('/manga/get/random',{method:'GET'}).then((resp)=>resp.json()),
         ])
        
         return resp
      }catch(e){
        console.log('Error fetching random genre in Parallel')
      }
  }

  getMangaChapterList = async ()=>{
    try{
      let resp = await axios.post('/manga/get/chapters',{id:this.state.selectedManga.id})
      this.setState({chapterList: resp.data})
      // this.setState({chapterList: resp.data})
      return resp.data
    }catch(e){
      console.log('Error fetching manga chapter list')
    }
  }

  mangaChapterPopUp = () => {
    this.setState({handleOpen: true})
  }

  closeModal = () => {
    this.setState({handleOpen: false})
  }

  openReaderModal = () => {
    this.setState({readerOpen: true})
  }

  closeReaderModal = () => {
    this.setState({readerOpen: false})
  }

  downloadChapter = async (mangaID:string,chapterID:string) => {
    try{
      let resp = await axios.post('/manga/get/download',{mangaId:mangaID,chapterId:chapterID})
      await this.getPage(mangaID,chapterID,0)
      this.openReaderModal()
    }catch(e){
      console.log('Error downloading chapter')
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

  nextPage = async () => {
    if (this.state.currentPage >= this.state.chapterPageCount){
      return
    }

    this.state.currentPage = this.state.currentPage + 1
    await this.getPage(this.state.selectedManga.id,this.state.currentChapter,this.state.currentPage)
  }

  prevPage = async () => {
    if (this.state.currentPage <= 0){
      return
    }

    this.state.currentPage = this.state.currentPage - 1
    await this.getPage(this.state.selectedManga.id,this.state.currentChapter,this.state.currentPage)
    this.setState({})
  }

  handleSearch = async (input:string) => {
    this.closeSearchResults()
    await this.searchManga(input)
    console.log(this.state.searchResults)
    this.openSearchResults()
  }

  closeSearchResults = () => {
    this.setState({searchResultsOpen: false})
  }

  openSearchResults = () => {
    this.setState({searchResultsOpen: true})
  }

  onHide = () =>{
    this.setState({inputFocused: false})
    if(this.state.searchInput === ''){
      this.closeSearchResults()
    }
  }

  onChange = (input:any) => {
    this.setState({searchInput: input})
  };

  onSubmit = ()=>{
    this.handleSearch(this.state.searchInput)
    this.onHide()
  }


  render(){
    return (
      <View>
        <ScreenNavbar navigation={this.props.navigation} destination={"Home"} />
        <div className="bg-noir h-screen w-screen no-scrollbar overflow-x-hidden">
          <div className="relative z-20 pt-2">
            <div>
              <div className="w-full h-16 max-w-lg translate-x-12 bg-black border border-black rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600 items-center justify-center">
                <input
                  type="text"
                  value={this.state.searchInput}
                  onFocus={() => {
                    this.setState({ inputFocused: true });
                  }}
                  className="w-full h-full rounded-full bg-transparent text-white dark:text-gray-200 pl-4"
                  placeholder=" Search"
                  onChange={() => {
                    if (this.state.searchInput === "") {
                      this.closeSearchResults();
                      this.setState({ searchResults: [] });
                    }
                  }}
                />

                <div
                  className={`${
                    this.state.inputFocused === false ? "hidden" : ""
                  }`}
                >
                  <motion.div drag>
                    <KeyboardComponent
                      onChange={this.onChange}
                      isToggled={this.state.inputFocused}
                      onHide={this.onHide}
                      onSubmit={this.onSubmit}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <div className='absolute top-31 pt-2 h-5/6 overflow-y-scroll z-10 no-scrollbar'>
            <div>
              {this.state.searchResultsOpen === true ? (
                <div>
                  <SearchResultComponent
                    searchResults={this.state.searchResults}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="z-0">
            <div className="pt-10 pl-5">
              <Typography variant="h5" sx={{ color: "white" }}>
                Manga Feed
              </Typography>
            </div>
            <div className="flex flex-row bg-noir m-auto pt-10">
              <div className="flex overflow-x-scroll pb-10  overflow-y-scroll no-scrollbar">
                <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
                  {this.state.mangaFeed.map((manga: any) => {
                    return (
                      <div className="inline-block px-3">
                        <button
                          onClick={async () => {
                            this.state.selectedManga = manga;
                            await this.getMangaChapterList();
                            this.mangaChapterPopUp();
                          }}
                        >
                          <div className="w-40 h-60 max-w-xs overflow-hidden rounded-lg shadow-md bg-bubblegum hover:shadow-xl transition-none duration-300 ease-in-out shadow-white">
                            <img
                              src={manga.coverArt}
                              className="w-40 h-60"
                            ></img>
                          </div>
                        </button>
                        <p className="text-white text-ellipsis overflow-hidden mb-3">
                          {manga.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {this.state.randomGenres.map((genre: any) => {
              return (
                <div className="flex flex-col bg-noir">
                  <div className="pb-5 pl-5">
                    <Typography variant="h5" sx={{ color: "white" }}>
                      {genre.genres}
                    </Typography>
                  </div>
                  <div className="flex flex-row justify-between m-auto">
                    <h1 className="text-2xl text-black ml-10">{genre.genre}</h1>
                  </div>
                  <div className="flex overflow-x-scroll pb-10 overflow-y-scroll no-scrollbar overflow-hidden">
                    <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
                      <div></div>
                      {genre.manga.map((manga: any) => {
                        return (
                          <div className="inline-block px-3">
                            <button
                              onClick={() => {
                                this.state.selectedManga = manga;
                                this.getMangaChapterList();
                                this.mangaChapterPopUp();
                              }}
                            >
                              <div className="w-40 h-60 max-w-xs overflow-hidden rounded-lg shadow-md bg-bubblegum hover:shadow-xl transition-none duration-300 ease-in-out shadow-white">
                                <img
                                  src={manga.coverArt}
                                  className="w-40 h-60"
                                ></img>
                              </div>
                            </button>
                            <p className="text-white">{manga.title}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <Modal
              open={this.state.handleOpen}
              onClose={this.closeModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="flex overflow-x-scroll overflow-y-scroll no-scrollbar">
                <Box sx={style}>
                  <div className="flex flex-row">
                    <img
                      src={this.state.selectedManga.coverArt}
                      width="80px"
                      height="80px"
                    ></img>
                    <div className="flex flex-col pl-5">
                      <Typography variant="h5">
                        {this.state.selectedManga.title}
                      </Typography>
                      <p className="text-justify overflow-y-clip w-82 h-20">
                        {this.state.selectedManga.description != undefined
                          ? `${this.state.selectedManga.description.en}`
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-y-auto">
                    <table className="table-auto overflow-y-auto h-600">
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
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
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
                              <td>
                                <button
                                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600"
                                  onClick={() => {
                                    // this.downloadChapter(
                                    //   this.state.selectedManga.id,
                                    //   chapter.id
                                    // );
                                    // this.getPage(
                                    //   this.state.selectedManga.id,
                                    //   chapter.id,
                                    //   0
                                    // );
                                    // this.openReaderModal();
                                    this.setState({
                                      currentChapter: chapter.id,
                                      chapterPageCount: chapter.pages,
                                      readerOpen: true,
                                    });
                                  }}
                                >
                                  Read
                                </button>
                                <Divider orientation="vertical" flexItem />
                                <button>Save</button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Box>
              </div>
            </Modal> */}

            {this.state.handleOpen == true ? <div>
                <MangaViewerComponent isOpen={this.state.handleOpen} closeModal={this.closeModal} selectedManga={this.state.selectedManga} chapterList={this.state.chapterList}/>
            </div>:<div></div>}

            {this.state.readerOpen === true ? (
              <MangaReader
                open={this.state.readerOpen}
                totalPages={this.state.chapterPageCount}
                currentPage={this.state.currentPage}
                mangaID={this.state.selectedManga.id}
                chapterID={this.state.currentChapter}
                onClose={this.closeReaderModal}
              />
            ) : (
              <div></div>
            )}

            {/* <Modal
              open={this.state.readerOpen}
              onClose={this.closeReaderModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={readerStyle}>
                <div className="flex flex-nowrap h-9 justify-end items-center overflow-hidden bg-noir">
                  <button onClick={this.closeReaderModal}>Close</button>
                </div>
                <div className="relative z-0">
                  <img src={this.state.pageSrc} width={500} height={200}></img>
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
            </Modal> */}
          </div>
          {/* <button onClick={this.getRandomGenre}>Fetch</button> */}
        </div>
      </View>
    );
  }
}

export default MangaScreen;