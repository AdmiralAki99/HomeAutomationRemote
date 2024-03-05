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
    this.getMangaFeed();
    this.getRandomGenre();
  }

  constructor(props: any){
    super(props);
    this.getMangaFeed = this.getMangaFeed.bind(this);
    this.getRandomGenre = this.getRandomGenre.bind(this);
  }

  getMangaFeed = async () => {
    try{
      const resp = await axios.post('/manga/search',{'title':''})
      this.setState({mangaFeed: resp.data});
    }
    catch(e){
      console.log('Error fetching manga feed')
    }
  }

  getRandomGenre = async () => {
    try{
        await fetch('/manga/get/random',{method:'GET'}).then((resp)=>resp.json()).then((data)=>{
          this.setState({randomGenres: data.manga})
           }
        );
      }
    catch(e){
      console.log('Error fetching random genre')
    }
  
  }


  render(){
    return (
      <View>
        <ScreenNavbar navigation={this.props.navigation} destination={"Home"} />
        <div>
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
        <div className='flex flex-row bg-noir m-auto pt-10'>
          <div className='flex overflow-x-scroll pb-10 hide-scroll-bar'>
              <div className='flex flex-nowrap lg:ml-40 md:ml-20 ml-10'>
                 {
                    this.state.randomGenres.map((manga:any)=>{
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
        {/* <button onClick={this.getRandomGenre}>Fetch</button> */}
      </div>
      </View>
    );
  }
}



export default MangaScreen;