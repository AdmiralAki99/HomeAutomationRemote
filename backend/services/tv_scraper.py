import time
import pyppeteer
import asyncio
import threading
from bs4 import BeautifulSoup

class TvScraper:
    
    ROOT_URL = "https://nunflix.org"
    
    def __init__(self):
        self.semaphore = asyncio.Semaphore(4)
    

    async def search_show(self, show_name):
        """
        Search for a show on the website
        Parameters:
            show_name (str): The name of the show to search for
        Returns:
            list: A list of JSON objects containing the search results
        """
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        page = await driver.newPage()
        
        await page.goto(f"{self.ROOT_URL}/search/{show_name}")
        
        try:
            # Wait for the page to load
            await page.waitForSelector(".searchResultsPage")
            time.sleep(1.5)
            
            SCROLL_PAUSE_TIME = 0.25
            
            # Get scroll height
            last_height = await page.evaluate("document.body.scrollHeight")
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
                        poster_img = self.__get_poster_info(poster_card)
                        title,date,media_type = self.__get_text_info(media.find("div", class_="textBlock"))
                        if(media_type == "TV"):
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
                if new_height == last_height:
                    break
                last_height = new_height
                
        except TimeoutError:
            print("Timeout")
        finally:
            await driver.close()
            
        print(f"Time taken: {time.time() - start_time}")
        return response
    
    def __get_poster_info(self, poster_card):
        """
        Get the poster image of the media
        Parameters:
            poster_card (BeautifulSoup): The BeautifulSoup object of the poster card
        Returns:
            str: The URL of the poster image
        """
        return poster_card.find("img")["src"]
    
    def __get_text_info(self, text_block):
        """
        Get the text information of the media
        Parameters:
            text_block (BeautifulSoup): The BeautifulSoup object of the text block
        Returns:
            tuple: A tuple containing the title, date and media type of the media
        """
        title = text_block.find("span", class_="title").text.strip()
        date = text_block.find("span",class_="date").text.strip()
        media_type = text_block.find("span", class_="mediaType").text.strip()
        
        return title,date,media_type
    
    async def get_show_season_info(self,show_url, season_number):
        """
        Get the information about the seasons and episodes of a show
        Parameters:
            show_url (str): The URL of the show
            season_number (int): The season number to get the information for
        Returns:
            list: A list of JSON objects containing the information about the episodes
        """
        start_time = time.time()
        driver = await pyppeteer.launch(
            executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe",
            headless=True,
        )
        page = await driver.newPage()

        await page.goto(f"{self.ROOT_URL}{show_url}")

        try:
            # Wait for the page to load
            await page.waitForSelector(".posterImg")
            await asyncio.sleep(2)
            
            # Getting the static details of the movie
            body = BeautifulSoup(await page.content(), "html.parser")
            
            # Now need to get the information about the seasons and the episodes
            seasons = body.find("select", id="season")
            season_value = seasons.find_all("option")[season_number - 1]['value']
            
            # Need to select the season from the dropdown
            await page.select("#season", season_value)
            await asyncio.sleep(1)
            # Wait for the page to load
            # Need to check if there is a .more-button to be loaded
            
            
            if not await page.querySelector(".episodeContainer .more-button"):
                await asyncio.sleep(1)
                episodes =  self.__get_season_info(await page.content(), season_number)
            else:
                  
                await page.waitForSelector(".episodeContainer .more-button")
            
                # Click the 'more-button' to load all episodes
                while True:
                    try:
                        more_button = await page.querySelector(".episodeContainer .more-button")
                        if more_button:
                            # print("Clicking 'more-button'")
                            await more_button.click()
                            await asyncio.sleep(2)
                        else:
                            break
                    except Exception as e:
                        break
                
                await asyncio.sleep(1)
                episodes =  self.__get_season_info(await page.content(), season_number)
            
        except TimeoutError:
            print("Timeout")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
        finally:
            await driver.close()

        print(f"Time taken: {time.time() - start_time}")
        return episodes
    
    async def get_show_info(self, show_url):
        """
        Get the information about a show
        Parameters:
            show_url (str): The URL of the show
        Returns:
            dict: A dictionary containing the information about the show
        """
        start_time = time.time()
        driver = await pyppeteer.launch(
            executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe",
            headless=True,
        )
        page = await driver.newPage()

        await page.goto(f"{self.ROOT_URL}{show_url}")

        try:
             # Wait for the page to load
            await page.waitForSelector(".posterImg")
            await asyncio.sleep(2)
            
             # Scroll down to load the carousel items
            carousel = await page.querySelector(".carousel")
            await page.evaluate('(element) => element.scrollIntoView()', carousel)
            for i in range(5):
                next_carousel = await page.querySelector(".carouselRightNav")
                await next_carousel.click()
                await asyncio.sleep(1)
            
            # Getting the static details of the movie
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
            
            # Getting the carousel items
            carousel = body.find("div",class_="carousel")
            carousel = carousel.find("div",class_="contentWrapper")
            carousel = carousel.find("div",class_="carouselItems")
            
            # Now need to get the information about the seasons and the episodes
            seasons = body.find("select", id="season")
            seasons = [season.text.strip() for season in seasons.find_all("option")]
                    
            # Getting the items
            items = carousel.find_all("a",class_="carouselItem")
            threads = []
            recommendations = []
            for item in items:
                thread = threading.Thread(target=self.__process_carousel_item,args=(item,recommendations))
                threads.append(thread)
                thread.start()
                
            for thread in threads:
                thread.join()
            
        except TimeoutError:
            print("Timeout")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
        finally:
            await driver.close()

        print(f"Time taken: {time.time() - start_time}")
        return{
            'title': title,
            'img': img,
            'description': description,
            'score': score,
            'status': status,
            'release_date': release_date,
            'genres': genre_list,
            'seasons': seasons,
            'recommendations': recommendations
        }
        
    def __process_carousel_item(self,item,recommendations):
        """
        Process the carousel item
        Parameters:
            item (BeautifulSoup): The BeautifulSoup object of the carousel item
            recommendations (list): The list to store the recommendations
        """
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
        
        recommendations.append({
            'title': title,
            'date': date,
            'media_type': item_type,
            'poster_img': poster,
            'rating': circle_rating,
            'link': item_link
        })
        
    async def __process_season(self,show_url,browser,i):
        """
        Process the season
        Parameters:
            show_url (str): The URL of the show
            browser (pyppeteer.browser): The browser object
            i (int): The season number
        Returns:
            list: A list of JSON objects containing the information about the episodes
        """
        page = await browser.newPage()
        await page.goto(f"{self.ROOT_URL}{show_url}")
        start_time = time.time()
        try:
            # Get the season dropdown
            await page.waitForSelector("#season")
            await asyncio.sleep(1)
            await page.select("#season", str(i))
            
            # Wait for the page to load
            await page.waitForSelector(".episodeContainer .more-button")
            # Click the 'more-button' to load all episodes
            while True:
                try:
                    more_button = await page.querySelector(".episodeContainer .more-button")
                    if more_button:
                        # print("Clicking 'more-button'")
                        await more_button.click()
                        await asyncio.sleep(2)
                    else:
                        break
                except Exception as e:
                    break
                
            # Get the episode information
            # print(f"Getting Season {i}")
            await asyncio.sleep(1)
            print(f"Getting Season {i}, Time Taken: {time.time() - start_time}")
            episodes =  self.get_season_info(await page.content(), i)
            print(f"Season {i}: {len(episodes)}")
        except TimeoutError:
            print("Timeout")
        finally:
            await page.close()
            print(f"Closed page for Season {i}")
            
        return episodes
            
    def __get_season_info(self,page_source,season_number):
        """
        Get the information about the episodes of a season
        Parameters:
            page_source (str): The HTML content of the page
            season_number (int): The season number
        Returns:
            list: A list of JSON objects containing the information about the episodes
        """
        try:
            body = BeautifulSoup(page_source, "html.parser")
            episodeContainer = body.find("div", class_="episodeContainer")
            episode_list = episodeContainer.find_all("div", class_="episodeCard")
            episodes = []
            for index in range(len(episode_list)):
                episode_img = episode_list[index].find("div", class_="episodeThumbnail").find("img")["src"]
                info = episode_list[index].find("div", class_="episodeInfo")
                title = info.find("h3").text.strip()
                date = info.find("p", class_="air-date").text.strip()
                desc = info.find("p", class_="overview").text.strip()
                run_time = info.find("p", class_="runtime").text.strip()
                episodes.append({
                    'number': index + 1,
                    'title': title,
                    'date': date,
                    'desc': desc,
                    'run_time': run_time,
                    'episode_img': episode_img
                })
        except Exception as e:
            print(f"An error occurred: {e} at season {season_number + 1}")
                
        return episodes
    
    async def get_episode_source_url(self, show_url, season_number, episode_number):
        """
        Get the source URL of the episode
        Parameters:
            show_url (str): The URL of the show
            season_number (int): The season number
            episode_number (int): The episode number
        Returns:
            dict: A dictionary containing the default source and the list of servers
        """
        start_time = time.time()
        browser = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe",headless=True)
        page = await browser.newPage()
        await page.goto(f'{self.ROOT_URL}/watch{show_url}/{season_number}/{episode_number}')
        
        try:
            await page.waitForSelector(".video-wrapper")
            # Wait for elements to load

            # Get the default iframe source
            iframe_element = await page.querySelector("iframe")
            default_source = await page.evaluate('(el) => el.src', iframe_element)

            # Click the server toggle button
            server_toggle = await page.querySelector(".server-toggle")
            try:
                await server_toggle.click()
            except:
                await page.evaluate('(el) => el.click()', server_toggle)

            await asyncio.sleep(2)

            # Get the server list and options
            server_list = await page.querySelector(".server-list")
            server_options = await server_list.querySelectorAll(".server-option")

            servers = []
            for server in server_options:
                server_text = await page.evaluate('(el) => el.textContent', server)
                servers.append(server_text)

        except TimeoutError:
            print("Timeout")
        finally:
            await browser.close()
            
        print(f"Time taken: {time.time() - start_time}")
        
        return {
            'default_url': default_source,
            'servers': servers
        }
        
            
    async def change_server(self, show_url, season_number, episode_number, server_name):
        """
        Change the server of the episode
        Parameters:
            show_url (str): The URL of the show
            season_number (int): The season number
            episode_number (int): The episode number
            server_name (str): The name of the new server
        Returns:
            dict: A dictionary containing the new source URL
        """
        start_time = time.time()
        browser = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe",headless=True)
        page = await browser.newPage()
        await page.goto(f'{self.ROOT_URL}/watch{show_url}/{season_number}/{episode_number}')
        
        try:
            # Wait for elements to load
            await page.waitForSelector(".video-wrapper")
            
            # Click the server toggle button
            server_toggle = await page.querySelector(".server-toggle")
            try:
                await server_toggle.click()
            except:
                await page.evaluate('(el) => el.click()', server_toggle)

            # Get the server list and options
            server_list = await page.querySelector(".server-list")
            server_options = await server_list.querySelectorAll(".server-option")

            # Select the server option with the same name as the new server
            for server in server_options:
                server_text = await page.evaluate('(el) => el.textContent', server)
                if server_text == server_name:
                    await server.click()
                    break

            await page.waitForSelector(".video-wrapper")

            # Get the new iframe source
            iframe_element = await page.querySelector("iframe")
            new_source = await page.evaluate('(el) => el.src', iframe_element)

        except TimeoutError:
            print("Timeout")
        finally:
            await browser.close()
            
        print(f"Time taken: {time.time() - start_time}")
        return {
            'default_url': new_source
        }
        
if __name__ == "__main__":
    scraper = TvScraper()
    # print(scraper.search_show("The Flash"))
    
    # print(scraper.get_show_info('/tv/59427'))
    
    # print(scraper.get_episode_source_url('tv/59427',1,1))
    # print(scraper.change_server('/tv/59427',1,1,"VidSrc RIP"))
    
    async def main():
        # shows = await scraper.search_show("The Flash")
        # print(shows)
        # info = await scraper.get_show_info("/tv/60735")
        # print(info)
        # episodes = await scraper.get_show_season_info("/tv/60735",2)
        # print(episodes)
        episode = await scraper.get_episode_source_url('tv/19885',1,1)
        print(episode)
        # server = await scraper.change_server('tv/19885',2,1,"VidSrc RIP")
        # print(server)

    asyncio.get_event_loop().run_until_complete(main())