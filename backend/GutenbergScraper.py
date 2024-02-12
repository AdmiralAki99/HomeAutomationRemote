from bs4 import BeautifulSoup
import requests
from urllib.request import urlretrieve

class GutenbergAPI:

    __url__ = {
        'base_ebooks': 'https://www.gutenberg.org/ebooks/',
        'base_search': 'https://www.gutenberg.org/ebooks/search/?query=',
        'base_download': 'https://www.gutenberg.org/ebooks/',
        'image': 'https://www.gutenberg.org/',
    }



    def __init__(self) -> None:
        pass

    def search_book(self, book_title: str) -> str:
        resp = requests.get(f"{self.__url__['base_search']}{book_title}")

        if resp.status_code == 200:
            soup = BeautifulSoup(resp.content, "html.parser")
            for tags in soup.find_all("li",class_="booklink"):
                print(f"Title: {tags.find('span',class_='title').text}")
                print("Image: ",tags.find('img',class_='cover-thumb'))

    def get_searched_book_metadata(self, book_title: str) -> str:
        pass

    def download_ebook(self, book_id: int) -> str:
       pass

    def get_book(self, book_id: int) -> str:
        pass


if __name__ == "__main__":
    g = GutenbergAPI()
    g.search_book("art of war")

