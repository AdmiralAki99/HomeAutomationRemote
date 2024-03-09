import React ,{useState, useEffect} from 'react';
import axios from 'axios';

import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';
import {ScreenNavbar } from '../components/Navbar';

import { ReactReader } from 'react-reader'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { get } from 'http';

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
};



type mangaProps = NativeStackScreenProps<ScreenParamList, 'Manga'>;

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
}

class MangaScreen extends React.Component<mangaProps> {
  state : MangaScreenStateType = {
    mangaFeed: [],
    randomGenres: [],
    genre: [],
    handleOpen: false,
    handleClose: false,
    selectedManga: {},
    chapterList: []
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
      console.log(resp.data)
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


  render(){
    return (
      <View>
        <ScreenNavbar navigation={this.props.navigation} destination={"Home"} />
        <div className="bg-noir max-w-screen w-screen overflow-clip overflow-x-hidden">
          <h1 className="text-white pt-10">Manga Feed</h1>
          <div className="flex flex-row bg-noir m-auto pt-10">
            <div className="flex overflow-x-scroll pb-10  overflow-y-scroll no-scrollbar">
              <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
                {this.state.mangaFeed.map((manga: any) => {
                  return (
                    <div className="inline-block px-3">
                      <button onClick={()=>{
                        this.setState({selectedManga: manga})
                        this.mangaChapterPopUp()
                        this.getMangaChapterList()
                      }}>
                        <div className="w-40 h-60 max-w-xs overflow-hidden rounded-lg shadow-md bg-bubblegum hover:shadow-xl transition-none duration-300 ease-in-out shadow-white">
                          <img src={manga.coverArt} className="w-40 h-60"></img>
                        </div>
                      </button>
                      <p className="text-white">{manga.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {this.state.randomGenres.map((genre: any) => {
            return (
              <div className="flex flex-col bg-noir">
                <h1 className="text-white pb-5">{genre.genres}</h1>
                <div className="flex flex-row justify-between m-auto">
                  <h1 className="text-2xl text-black ml-10">{genre.genre}</h1>
                </div>
                <div className="flex overflow-x-scroll pb-10 overflow-y-scroll no-scrollbar overflow-hidden">
                  <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
                    <div></div>
                    {genre.manga.map((manga: any) => {
                      return (
                        <div className="inline-block px-3">
                          <button onClick={this.mangaChapterPopUp}>
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

          <Modal
            open={this.state.handleOpen}
            onClose={this.closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {this.state.selectedManga.title}
              {this.state.selectedManga.id}
              <table className='table-auto overflow-scroll'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Chapter</th>
                    <th>Volume</th>
                    <th>Page Count</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.chapterList.map((chapter: any) => {
                    return (
                      <tr>
                        <td>{chapter.title}</td>
                        {/* <td>{chapter.chapter}</td>
                        <td>{chapter.volume}</td>
                        <td>{chapter.pageCount}</td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Box>
          </Modal>

          {/* <button onClick={this.getRandomGenre}>Fetch</button> */}
        </div>
      </View>
    );
  }
}





export default MangaScreen;