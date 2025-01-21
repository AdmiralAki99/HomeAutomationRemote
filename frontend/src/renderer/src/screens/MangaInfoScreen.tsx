import { Component } from 'react'
import { View } from 'react-native'

import Navbar from '../components/Navbar'
import { ChevronLeft } from 'react-bootstrap-icons'
import serverAPI from '../ServerAPI'

import IssueCarousel from '../components/IssueCarousel'

type MangaInfoScreenProps = {
  navigation: any
  route: any
}

class MangaInfoScreen extends Component<MangaInfoScreenProps> {
  state = {
    chapters: []
  }

  constructor(props: MangaInfoScreenProps) {
    super(props)
    this.handleChapterList = this.handleChapterList.bind(this)
  }

  componentDidMount(): void {
    this.handleChapterList()
  }

  async handleChapterList() {
    await serverAPI
      .get(`/mangas/get/chapter/list?manga_id=${this.props.route.params.id}`)
      .then((response) => {
        this.setState({ chapters: response.data })
      })
    console.log(this.state.chapters)
  }

  render() {
    return (
      <View>
        <div className="h-screen no-scrollbar">
          <Navbar
            leftItems={[
              <button
                className="flex w-12 h-12 bg-noir text-primary_text items-center justify-center "
                onClick={() => this.props.navigation.pop()}
              >
                <ChevronLeft color="white" />
              </button>
            ]}
            rightItems={[]}
          />
          <div className="grid grid-cols-3 bg-white p-2 rounded-xl shadow-md shadow-slate-200">
            <div className="col-span-1 pr-2">
              <img src={`data:image/jpg;base64,${this.props.route.params.img}`} className='rounded-md'/>
            </div>
            <div className="col-span-2">
              <h1 className="text-2xl font-bold">{this.props.route.params.title}</h1>
              <p className="text-lg font-semibold">{this.props.route.params.author}</p>
              <p className="text-lg font-semibold">Tags:</p>
              <div className="flex flex-row gap-1">
                {this.props.route.params.tags.slice(0, 4).map((tag: any, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 text-gray-600 text-sm font-semibold italic px-2 py-1 rounded-full mr-1"
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
              <p className="text-lg font-semibold">Status: {this.props.route.params.status}</p>
              <p className="text-lg line-clamp-5">{this.props.route.params.description}</p>
            </div>
          </div>
          <div className=" h-[62%] w-screen absolute z-0 overflow-hidden">
            <IssueCarousel
              titles={this.state.chapters.map((result: any) => `${result.chapter}`)}
              links={this.state.chapters.map((result: any) => result.id)}
              onIssueClick={(link: string) => {this.props.navigation.push('MangaReader',{url: link})}}
              navigation={this.props.navigation}
              route="MangaReader"
            />
          </div>
        </div>
      </View>
    )
  }
}

export default MangaInfoScreen
