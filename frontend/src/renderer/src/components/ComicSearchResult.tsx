import React from 'react'

type ComicSearchResultProps = {
  key: number
  title: string
  url: string
  thumbnail: string
  status: string
  publication: string
  summary: string
  navigation : any
}

class ComicSearchResult extends React.Component<ComicSearchResultProps> {
  constructor(props: ComicSearchResultProps) {
    super(props)
  }

  render() {
    return (
      <a onClick={()=>{this.props.navigation.push('ComicInfo', {url: this.props.url, description: this.props.summary, title: this.props.title,img: this.props.thumbnail})}}>
        <div className="bg-white shadow-md rounded-lg p-2 w-80 flex">
          <img
            src={this.props.thumbnail}
            alt={this.props.title}
            className="w-24 h-32 object-cover rounded-lg mr-4"
          />
          <div>
            <h3 className="text-md font-medium">{this.props.title}</h3>
            <p className="text-gray-600 text-sm font-semibold italic">{this.props.publication}</p>
            <p className="text-gray-600 text-sm font-semibold italic">{this.props.status}</p>
            <p className="text-gray-600 text-sm justify-evenly h-16 overflow-hidden text-ellipsis line-clamp-3">
              {this.props.summary}
            </p>
          </div>
        </div>
      </a>
    )
  }
}

export default ComicSearchResult
