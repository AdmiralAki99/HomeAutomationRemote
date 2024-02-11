from bs4 import BeautifulSoup
import requests
from urllib.request import urlretrieve

class GutenbergAPI:

    __url__ = {
        'base_ebooks': 'https://www.gutenberg.org/ebooks/',
    }



    def __init__(self) -> None:
        pass

    def search_book(self, book_title: str) -> str:
        pass

    def get_searched_book_metadata(self, book_title: str) -> str:
        pass

    def download_ebook(self, book_id: int) -> str:
       pass

    def get_book(self, book_id: int) -> str:
        pass


if __name__ == "__main__":
    resp = requests.get("https://www.gutenberg.org/ebooks/1342")

    if resp.status_code == 200:
        soup = BeautifulSoup(resp.content, "html.parser")
        
        for tags in soup.find_all("a",class_="link"):
            print(tags.get('href'))


