import React from 'react'

type MangaSearchResultProps = {
  id: string
  key: number
  header: string
  subtitle: Array<any>
  thumbnail: string
  url: string
  navigation: any
  description: string
  route: any
  imageType: string
  tags: any
  status: string
}

class MangaSearchResult extends React.Component<MangaSearchResultProps> {
  constructor(props: MangaSearchResultProps) {
    super(props)
  }

  componentDidMount(): void {}

  render() {
    return (
      <a
        onClick={async () => {
          await this.props.navigation.push(this.props.route, {
            url: this.props.url,
            img: this.props.thumbnail,
            description: this.props.description,
            status: this.props.status,
            year: this.props.subtitle[0],
            title: this.props.header,
            tags: this.props.tags,
            author: this.props.subtitle[1],
            id: this.props.id
          })
        }}
      >
        <div className="bg-white shadow-md rounded-lg p-2 w-80 flex">
          <img
            src={`data:image/${this.props.imageType};base64,${this.props.thumbnail}`}
            className="w-24 h-32 object-cover rounded-lg mr-4"
          />
          <div className="flex w-48 flex-col">
            <h3 className="text-md font-medium">{this.props.header}</h3>
            {this.props.subtitle.map((sub: any, index) => (
              <p className="text-gray-600 text-sm font-semibold italic">{sub}</p>
            ))}
            <div className="flex flex-row gap-1">
              <p className="text-gray-600 text-sm font-semibold italic">Tags:</p>
              {this.props.tags.slice(0, 2).map((tag: any, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-gray-600 text-sm font-semibold italic px-2 py-1 rounded-full mr-1"
                >
                  {tag.name}
                </div>
              ))}
            </div>

            {this.props.description ? (
              <p className="text-gray-600 text-sm font-semibold italic line-clamp-3">
                {this.props.description}
              </p>
            ) : null}
          </div>
        </div>
      </a>
    )
  }
}

export default MangaSearchResult
