import requests
from bs4 import BeautifulSoup

class AnimeManager:

    ANIME_URL = 'https://gogoanime3.co'
    REQUEST_HEADERS = {
        'User-Agent': 'Mozilla/5.0'
    }

    def __init__(self) -> None:
        pass

    def search(self,query: str):
        search_url = f'{self.ANIME_URL}/search.html?keyword={query}'

        response = requests.get(search_url)

        anime_search_list = []

        # Check if the request was successful or not
        if response.status_code == 200:
            # The request was successful, now we need to decode the data
            print('Request was successful')

            # We use BeautifulSoup to parse HTML page
            soup = BeautifulSoup(response.content, 'html.parser')

            # Find the elements in the list
            anime_list = soup.find('ul', class_='items').find_all('li')

            for anime in anime_list:
                anime_name = anime.find('p',class_='name').text
                anime_url = anime.find('a')['href']
                release_date = anime.find('p',class_='released').text
                anime_search_list.append({
                    'name': anime_name.strip(),
                    'url': anime_url,
                    'release_date': release_date.strip()
                })

            return anime_search_list
        
        else:
            # There was an error, message needs to be sent
            return None
        

    def get_episodes(self, anime_url: str):

        episodes_url = f'{self.ANIME_URL}{anime_url}'

        response = requests.get(episodes_url)

        if response.status_code == 200:
            # The request was successful now we need to handle the lists

            soup = BeautifulSoup(response.content, 'html.parser')

            




if __name__ == '__main__':
    anime_manager = AnimeManager()
    print(anime_manager.search('dragon ball'))
