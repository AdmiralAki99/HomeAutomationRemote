from bs4 import BeautifulSoup
import requests
from urllib.request import urlretrieve
import json

class Book:
    def __init__(self, title: str, author: str, id: int, cover: str) -> None:
        self.title = title
        self.author = author
        self.id = id
        self.cover = cover

    def __str__(self) -> str:
        return f"Title: {self.title}\nAuthor: {self.author}\nID: {self.id}\nCover: {self.cover}"

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
                print(f"ID: {tags.find('a').get('href').split('/')[-1]}")
                print(f"Title: {tags.find('span',class_='title').text}")
                if tags.find('span',class_='subtitle') is not None:
                    print(f"Author: {tags.find('span',class_='subtitle').text}")
                
                print(tags.find('img'))
                

    def get_searched_book_metadata(self, book_title: str) -> str:
        pass

    def download_ebook(self, book_id: int) -> str:
       pass

    def get_book(self, book_id: int) -> str:
        pass


if __name__ == "__main__":
    g = GutenbergAPI()
    g.search_book("art of war")

