import time
import json
import threading
import asyncio
import pyppeteer
from bs4 import BeautifulSoup

class MovieScraper:
    
    ROOT_URL = "https://nunflix.org"
    
    def __init__(self):
        pass
    
    async def get_homepage(self):
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        page = await driver.newPage()
        
        await page.goto(f'{self.ROOT_URL}/explore/popular?sortby=popularity.desc')
        
        try:
            # Wait for the page to load
            await page.waitForSelector(".infinite-scroll-component__outerdiv")
            time.sleep(1.5)
            
            SCROLL_PAUSE_TIME = 0.25
            
            # Get scroll height
            last_height = await page.evaluate("document.body.scrollHeight")
            response = []
            counter = 0
            while True:
                # Wait to load page
                time.sleep(SCROLL_PAUSE_TIME)
                
                # Now the data needs to be scraped
                soup = BeautifulSoup(await page.content(), "html.parser")
                search_results = soup.find("div", class_="infinite-scroll-component")
                
                media_results = search_results.find_all("a", class_="movieCard")
                for media in media_results:
                    poster_card = media.find("div", class_="posterBlock")
                    if("lazy-load-image-loaded" in poster_card.find("span")['class']):
                        ## The media has a poster and is loaded
                        poster_img = self.get_poster_info(poster_card)
                        title,date,media_type = self.get_text_info(media.find("div", class_="textBlock"))
                        if(media_type == "Movie"):
                            response.append({
                                'title': title,
                                'date': date,
                                'poster_img': poster_img if "http" in poster_img else self.ROOT_URL + poster_img,
                                'media_type': media_type,
                                'link': media['href']
                            })
                    else:
                        ## The media has no poster and is not loaded, when the window is scrolled down then the media would be loaded by JS
                        pass
                # Scroll down to bottom
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight);")
                # Calculate new scroll height and compare with last scroll height
                new_height = await page.evaluate("document.body.scrollHeight")
                if new_height == last_height or counter == 5:
                    break
                last_height = new_height
                counter += 1
        except TimeoutError:
            print("Timeout")
        finally:
            await driver.close()
            
        print(f"Time taken: {time.time() - start_time}")
        return [json.loads(media) for media in set(json.dumps(item) for item in response)]
    
    async def search_media(self, movie_name):
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=False)
        page = await driver.newPage()
        
        await page.goto(f"{self.ROOT_URL}/search/{movie_name}")
        
        try:
            # Wait for the filter buttons
            await page.waitForSelector(".mediaTypeFilter")
            await asyncio.sleep(1)
            
            filter_buttons = await page.querySelectorAll(".preferenceButton")
            for button in filter_buttons:
                button_text = await page.evaluate('(el) => el.textContent', button)
                if "Movies" in button_text:
                    # Click the TV Shows button
                    while True:
                        try:
                            if await button.isIntersectingViewport():
                                await button.click()
                                break
                        except:
                            pass
                    print("Clicked TV Shows button")
            
            print("Waiting for search results")
            
            # Wait for the page to load
            await page.waitForSelector(".searchResultsPage")
            await asyncio.sleep(2)
            
            SCROLL_PAUSE_TIME = 0.5
            
            # Get scroll height
            last_height = await page.evaluate("document.body.scrollHeight")
            counter = 0
            response = []
            while True:
                # Wait to load page
                time.sleep(SCROLL_PAUSE_TIME)
                
                # Now the data needs to be scraped
                soup = BeautifulSoup(await page.content(), "html.parser")
                search_results = soup.find("div", class_="searchResultsPage")
                search_results = search_results.find("div", class_="infinite-scroll-component content")
                
                media_results = search_results.find_all("a", class_="movieCard")
                for media in media_results:
                    poster_card = media.find("div", class_="posterBlock")
                    if("lazy-load-image-loaded" in poster_card.find("span")['class']):
                        ## The media has a poster and is loaded
                        poster_img = self.get_poster_info(poster_card)
                        title,date,media_type = self.get_text_info(media.find("div", class_="textBlock"))
                        response.append({
                                'title': title,
                                'date': date,
                                'poster_img': poster_img if "http" in poster_img else self.ROOT_URL + poster_img,
                                'media_type': media_type,
                                'link': media['href']
                        })
                           
                    else:
                        ## The media has no poster and is not loaded, when the window is scrolled down then the media would be loaded by JS
                        pass
                    
                # Scroll down to bottom
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight);")
                await page.screenshot()
                # Calculate new scroll height and compare with last scroll height
                new_height = await page.evaluate("document.body.scrollHeight")
                if new_height == last_height or counter == 5:
                    break
                last_height = new_height
                counter += 1
        except TimeoutError:
            print("Timeout")
        finally:
            await page.screenshot()
            await driver.close()
        
        print(f"Time taken: {time.time() - start_time}")
        return [json.loads(media) for media in set(json.dumps(item) for item in response)]

    def get_poster_info(self, poster_card):
        return poster_card.find("img")["src"]
    
    def get_text_info(self, text_block):
        title = text_block.find("span", class_="title").text.strip()
        date = text_block.find("span",class_="date").text.strip()
        media_type = text_block.find("span", class_="mediaType").text.strip()
        
        return title,date,media_type
    
    async def get_movie_info(self, media_url):
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        page = await driver.newPage()
        
        await page.goto(f"{self.ROOT_URL}{media_url}")
        
        try:
            # Wait for the page to load
            await page.waitForSelector(".posterImg")
            await asyncio.sleep(1.5)
            
            # Scroll down to load the carousel items
            carousel = await page.querySelector(".carousel")
            await page.evaluate('(element) => element.scrollIntoView()', carousel)
            for i in range(5):
                next_carousel = await page.querySelector(".carouselRightNav")
                await next_carousel.click()
                await asyncio.sleep(1)
                
            
            
            body = BeautifulSoup(await page.content(), "html.parser")
            left = body.find("div",class_="left")
            right = body.find("div",class_="right")
            
            img = left.find("img")['src']
            
            title = right.find("h1").text.strip()
            overview = right.find("div",class_="overview")
            description = overview.find("h3").text.strip()
            
           
            
            # Getting info about the movie
            score = right.find("text",class_ = "CircularProgressbar-text").text.strip()
            info = right.find_all("div",class_="info")[0]
            
            # Getting the release date, genres, runtime and rating
            genres = right.find("div",class_="genres")
            genre_list = []
            for genre in genres.find_all("div",class_="genre"):
                genre = genre.text.strip()
                genre_list.append(genre)
            status = info.find_all("div",class_="infoItem")[0]
            status = status.find("h4",class_="text").text.strip()
            release_date = info.find_all("div",class_="infoItem")[1]
            release_date = release_date.find("h4",class_="text").text.strip()
            run_time = info.find_all("div",class_="infoItem")[2]
            run_time = run_time.find("h4",class_="text").text.strip()
            
            # Getting the director information for the movie
            info = right.find_all("div",class_="info")[2]
            director = info.find("h4",class_="text").text.strip()
            
            # Getting the writer information for the movie
            info = right.find_all("div",class_="info")[3]
            writer = info.find("h4",class_="text").text.strip()
            
            # Getting the carousel items
            carousel = body.find("div",class_="carousel")
            carousel = carousel.find("div",class_="contentWrapper")
            carousel = carousel.find("div",class_="carouselItems")
            
            # Getting the items
            items = carousel.find_all("a",class_="carouselItem")
            threads = []
            recommendations = []
            for item in items:
                thread = threading.Thread(target=self.process_carousel_item,args=(item,recommendations))
                threads.append(thread)
                thread.start()
                
            for thread in threads:
                thread.join()
            
        except TimeoutError:
            print("Timeout")
        finally:
            await driver.close()
            
        print(f"Time taken: {time.time() - start_time}")  
        return {
            'img': img,
            'genres': genre_list,
            'title': title,
            'director': director,
            'writer': writer,
            'description': description,
            'link': media_url,
            'score': score,
            'status': status,
            'release_date': release_date,
            'run_time': run_time,
            'recommendations': recommendations
        }
        
    def process_carousel_item(self, item,results):
        item_link = item['href']
        text_block = item.find("div",class_="textBlock")
        title = text_block.find("span",class_="title").text.strip()
        date = text_block.find("div",class_="dateQualityWrapper")
        item_type = date.find("span",class_="mediaType").text.strip()
        date = date.find("span",class_="date").text.strip()
                
        poster_block = item.find("div",class_="posterBlock")
        poster = poster_block.find("span")
        if poster.find("img") is None:
            return
        poster = poster.find("img")['src']
        circle_rating = poster_block.find("div",class_="circleRating")
        circle_rating = circle_rating.find("text",class_="CircularProgressbar-text").text.strip()
        
        results.append({
            'title': title,
            'date': date,
            'media_type': item_type,
            'poster_img': poster,
            'rating': circle_rating,
            'link': item_link
        })
        
    async def get_movie(self,media_url):
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        page = await driver.newPage()
        
        if media_url.startswith("/tv"):
            media_url = media_url.replace("/tv","/watch/tv")
        else:
            media_url = media_url.replace("/movie","/watch/movie")
            
        await page.goto(f"{self.ROOT_URL}{media_url}")
        
        try:
            # Wait for the page to load
            await page.waitForSelector(".video-wrapper")
            
            body = BeautifulSoup(await page.content(), "html.parser")
            # Get the player
            player =  body.find("div",class_="video-wrapper")
            frame = player.find("iframe")['src']
            
            # Need to get the rest of the server
            servers = []
            # Movies have no server selection
            server_list = body.find("div", class_="server-grid")
            server_list = server_list.find_all("button")
            
            for server in server_list:
                servers.append(server.text)
                
        except TimeoutError:
            print("Timeout")
        finally:
            await driver.close()
            
        print(f"Time taken: {time.time() - start_time}")
        return {
            'default_url': frame,
            'servers': servers
        }
    
    async def change_server(self,movie_link,server_name):
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=False)
        page = await driver.newPage()
        
        await page.goto(f"{self.ROOT_URL}/watch{movie_link}")
        
        try:
            # Wait for the page to load
            await page.waitForSelector(".video-wrapper")
            
            # Select the server tag
            server_list = await page.querySelector(".server-grid")
            
            # Get the server buttons
            server_buttons = await server_list.querySelectorAll("button")
            
            for server in server_buttons:
                server_text = await page.evaluate('(element) => element.textContent', server)
                if server_text == server_name:
                    await server.click()
                    break
                    
            await page.waitForSelector(".video-wrapper")
            
            body = BeautifulSoup(await page.content(), "html.parser")
            iframe = body.find("iframe")
            default_url = iframe['src']
            
        except TimeoutError:
            print("Timeout")
        except Exception as e:
            print(f'Error occured: {e}')
        finally:
            await driver.close()
            
        print(f"Time taken: {time.time() - start_time}")
        
        return {
            'default_url': default_url
        }
            
        
        
if __name__ == "__main__":
    
    
    scraper = MovieScraper()
    # print(scraper.search_media("avengers"))
    
    # print(scraper.get_media('/movie/299534'))
    # print(scraper.get_movie('/movie/141052'))
    # print(scraper.get_tv_series_info('tv/59427'))
    
    # print(scraper.get_movie_info('/movie/141052'))
    
    # print(scraper.change_server('/movie/299534','Vidsrc ICU'))
    
    async def main():
        search = await scraper.search_media("The avengers")
        print(search)
        # info = await scraper.get_movie_info("/movie/299536")
        # print(info)
        # movie = await scraper.get_movie("/movie/141052")
        # print(movie)
        # server = await scraper.change_server("/movie/141052","VidBinge")
        # print(server)
        # popular = await scraper.get_home_page()
        # print(popular)

    asyncio.get_event_loop().run_until_complete(main())