import React ,{useState, useEffect} from 'react';
import axios from 'axios';

import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';
import {ScreenNavbar } from '../components/Navbar';

import { ReactReader } from 'react-reader'

import EpubReader from '../components/MangaReader';
import MangaReader from '../components/MangaReader';



type mangaProps = NativeStackScreenProps<ScreenParamList, 'Manga'>;

interface GenreRow{
  genre: string;
  manga: any[];
}

interface MangaScreenStateType {
  mangaFeed: any[];
  genre: GenreRow[];
  randomGenres: any[];
}

class MangaScreen extends React.Component<mangaProps> {
  state : MangaScreenStateType = {
    mangaFeed: [],
    randomGenres: [],
    genre: [],
  }

  componentDidMount(): void {
    this.getMangaFeed().then((data)=>{
      this.setState({mangaFeed: data})
    })
    this.getRandomGenreInParallel().then((data)=>{
      this.setState({randomGenres: data})
    })
    console.log(this.state.randomGenres)
  }

  useEffect = () => {
    
  }

  constructor(props: any){
    super(props);
    this.getMangaFeed = this.getMangaFeed.bind(this);
    this.getRandomGenreInParallel = this.getRandomGenreInParallel.bind(this);
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
          await fetch('/manga/get/random',{method:'GET'}).then((resp)=>resp.json()).then((data)=>{return data}),
          await fetch('/manga/get/random',{method:'GET'}).then((resp)=>resp.json()).then((data)=>{return data}),
         ])
        
         return resp
      }catch(e){
        console.log('Error fetching random genre in Parallel')
      }
  }


  render(){
    return (
      <View>
        <ScreenNavbar navigation={this.props.navigation} destination={"Home"} />
        <div className='bg-noir'>
        <div className='flex flex-row bg-noir m-auto pt-10'>
          <div className='flex overflow-x-scroll pb-10 hide-scroll-bar'>
              <div className='flex flex-nowrap lg:ml-40 md:ml-20 ml-10'>
                 {
                    this.state.mangaFeed.map((manga:any)=>{
                      return (
                        <div className="inline-block px-3">
                          <div className="w-40 h-60 max-w-xs overflow-hidden rounded-lg shadow-md bg-bubblegum hover:shadow-xl transition-none duration-300 ease-in-out shadow-white">
                            <img src={manga.coverArt} className='w-40 h-60'></img>
                          </div>
                        </div>
                      );
                    })
                  }
              </div>
          </div>
        </div>
        {
          this.state.randomGenres.map((genre:any)=>{
            return (
              <div className='flex flex-col bg-noir'>
                <div className='flex flex-row justify-between'>
                  <h1 className='text-2xl text-black ml-10'>{genre.genre}</h1>
                </div>
                <div className='flex overflow-x-scroll pb-10 hide-scroll-bar'>
                  <div className='flex flex-nowrap lg:ml-40 md:ml-20 ml-10'>
                    <div ></div>
                    {
                      genre.manga.map((manga:any)=>{
                        return (
                          <div className="inline-block px-3">
                            <div className="w-40 h-60 max-w-xs overflow-hidden rounded-lg shadow-md bg-bubblegum hover:shadow-xl transition-none duration-300 ease-in-out shadow-white">
                              <img src={manga.coverArt} className='w-40 h-60'></img>
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              </div>
            );
          })
        }
       
        {/* <button onClick={this.getRandomGenre}>Fetch</button> */}
      </div>
      </View>
    );
  }
}





export default MangaScreen;