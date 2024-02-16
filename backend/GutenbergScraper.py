from bs4 import BeautifulSoup
import requests
from urllib.request import urlretrieve
import json
import os

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
        'image_url': 'https://www.gutenberg.org/',
    }

    download_src = './ebooks/'



    def __init__(self) -> None:
        pass

    def search_book(self, book_title: str) -> str:
        resp = requests.get(f"{self.__url__['base_search']}{book_title}")
        books = []
        if resp.status_code == 200:
            soup = BeautifulSoup(resp.content, "html.parser")
            for tags in soup.find_all("li",class_="booklink"):
                if tags.find('span',class_='subtitle') is not None:
                    author = {tags.find('span',class_='subtitle').text}
                else:
                    continue
                
                if tags.find('img') is not None:
                    cover = f'{self.__url__["image_url"]}{(tags.find("img"))["src"]}'
                else:
                    continue

                id = tags.find('a').get('href').split('/')[-1]
                title = tags.find('span',class_='title').text
                books.append({
                    'title':title,
                    'author':author,
                    'id':id,
                    'cover':cover
                })
            return books

                

    def get_searched_book_metadata(self, book_title: str) -> str:
        pass

    def download_ebook(self, book_id: int,book_name) -> str:
        return urlretrieve(f"{self.__url__['base_download']}{book_id}.epub3.images",f"{os.path.join(r'./backend/epub/',f'{book_name}.epub')}")

    def get_book(self, book_id: int) -> str:
        pass


if __name__ == "__main__":
    g = GutenbergAPI()
    g.download_ebook(145,'Middlemarch')
