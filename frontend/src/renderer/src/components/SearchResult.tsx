import React from 'react'

type SearchResultProps = {
  key: number
  header: string
  subtitle: [any]
  thumbnail: string
  url: string
  navigation: any
  description: string
  route: any
}

class SearchResult extends React.Component<SearchResultProps> {
  constructor(props: SearchResultProps) {
    super(props)
  }

  render() {
    return (
      <a
        onClick={() => {
          this.props.navigation.push(this.props.route, {
            url: this.props.url,
            img: this.props.thumbnail
          })
        }}
      >
        <div className="bg-white shadow-md rounded-lg p-2 w-80 flex">
          <img src={this.props.thumbnail} className="w-24 h-32 object-cover rounded-lg mr-4" />
          <div>
            <h3 className="text-md font-medium">{this.props.header}</h3>
            {this.props.subtitle.map((sub: any, index) => (
              <p className="text-gray-600 text-sm font-semibold italic">{sub}</p>
            ))}
            {this.props.description ? (
              <p className="text-gray-600 text-sm font-semibold italic">{this.props.description}</p>
            ) : null}
          </div>
        </div>
      </a>
    )
  }
}

export default SearchResult
