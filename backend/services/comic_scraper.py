import requests
import threading
import time
import pyppeteer
import asyncio
from bs4 import BeautifulSoup

class ComicBookScraper:
    
    ROOT_URL = "https://readcomiconline.li"
    driver = None
    
    def __init__(self):
        # self.options.add_argument("--headless")
        pass
    
    async def get_home_page(self):
        # Getting the home page
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        page = await driver.newPage()
        await page.goto(f"{self.ROOT_URL}/")
        
        try:
            await page.waitForSelector("#subcontent")
            resp = await page.content()
            
            # Get the tabs for the home page
            soup = BeautifulSoup(resp, "html.parser")
            tab_newest = soup.find("div", id="tab-newest")
            tab_top_day = soup.find("div", id="tab-top-day")
            tab_top_week = soup.find("div", id="tab-top-week")
            tab_top_month = soup.find("div", id="tab-top-month")
            tab_mostview = soup.find("div", id="tab-mostview")
            
            tab_results = []
            tab_results = await asyncio.gather(
                self.get_tab(tab_newest),
                self.get_tab(tab_top_day),
                self.get_tab(tab_top_week),
                self.get_tab(tab_top_month),
                self.get_tab(tab_mostview)
            )
                    
            newest_comics = tab_results[0]
            top_day_comics = tab_results[1]
            top_week_comics = tab_results[2]
            top_month_comics = tab_results[3]
            mostview_comics = tab_results[4]          
        
        except TimeoutError:
            print("Timeout")
        finally:
            await driver.close()
            
        print(f"Time taken: {time.time() - start_time}")
        return {
            "newest": newest_comics,
            "top_day": top_day_comics,
            "top_week": top_week_comics,
            "top_month": top_month_comics,
            "mostview": mostview_comics
        }
        
    async def get_tab(self,tab):
        # Get the tab
        # TODO: Implement the scraping
        tab_comics = []
        for comics in tab.find_all("div",recursive=False):
            if "text-align" not in comics['style']:
                tab_comics.append(await self.__get_comic_book_series(comics))
            
            
            
        return tab_comics
        
    async def __get_comic_book_series(self, series_name):
        img = series_name.find_all("a")[0]
        img = img.find("img")["src"]
        title = series_name.find("a",class_="title")
        title = title.text.strip()
        url = series_name.find("a",class_="title")["href"]
        
        genres = series_name.find_all("p")[0]
        genre_list = []
        for genre in genres.find_all("a",class_="dotUnder"):
            genre_list.append(genre.text)
            
        latest = series_name.find_all("p")[1]
        latest = latest.find("a")
        latest = latest.text.strip()
        
        return{
            "title": title,
            "url": "/"+url,
            "img": self.ROOT_URL+img,
            "genres": genre_list,
            latest: latest
        }
        
            
    async def search_comic_book_series(self, series_name):
        # Search for the comic book series by using requests
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        page = await driver.newPage()
        await page.goto(f"{self.ROOT_URL}/")
        
        series = []
        try:
            await page.type("#keyword", series_name)
            await page.keyboard.press("Enter")
            # Wait for the page to load
            await asyncio.sleep(1.5)
            await page.waitForSelector(".list-comic")
            resp = await page.content()
            soup = BeautifulSoup(resp, "html.parser")
            search_results = soup.find("div", class_="list-comic")
            search_results = search_results.find_all("div", class_="item")
            
            for result in search_results:
                url = result.find("a")["href"]
                img = result.find("img")["src"]
                title = result.find("span", class_="title").text
                status, publication,summary = self.get_comic_book_search_info(result['title'])
                series.append({
                    "title": title,
                    "url": url,
                    "img": self.ROOT_URL+img,
                    "status": status,
                    "publication": publication,
                    "summary": summary
                })
        except TimeoutError:
            print("Timeout")
        finally:
            await driver.close()
            
        print(f"Time taken: {time.time() - start_time}")
            
        return series
    
    def get_comic_book_search_info(self,search_result):
        # Get the comic book search info
        soup = BeautifulSoup(search_result, 'html.parser')

        # Predefined tag structure after examination
        info_tags = soup.find_all('p')
        status_tags = info_tags[1].text.split(":")
        publication_tags = info_tags[2].text.split(":")
        summary = info_tags[4].text.strip()
        
        return status_tags[1].strip(), publication_tags[1].strip(), summary
    
    async def get_comic_book_series(self, series_url):
        
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        page = await driver.newPage()
        await page.goto(f"{self.ROOT_URL}/{series_url}")
        
        try:
            # Waiting got the page to load
            await page.waitForSelector(".listing")
            resp = await page.content()
            soup = BeautifulSoup(resp, "html.parser")
            
            # Getting the series info
            bigBarContainer = soup.find("div", class_="bigBarContainer")
            title = bigBarContainer.find("div",class_="barTitle").text.strip()
            info_tags = bigBarContainer.find_all("p")
            other_name = info_tags[0].text.split(":")[1].strip()
            genres = info_tags[1].text.split(":")[1].strip()
            publisher = info_tags[2].text.split(":")[1].strip()
            writer = info_tags[3].text.split(":")[1].strip()
            artist = info_tags[4].text.split(":")[1].strip()
            publication = info_tags[5].text.split(":")[1].strip()
            summary = info_tags[-2].text.strip()
            
            # Scrape the issues
            issue_list = soup.find("table", class_="listing")
            issue_list = issue_list.find_all("td")
            issues = []
            for index in range(0, len(issue_list),2):
                issue = {'title': '', 'url': '', 'date': ''}
                if issue_list[index].find("a") is not None:
                    title = issue_list[index].find("a").text.strip()
                    url = issue_list[index].find("a")["href"]
                    issue["title"] = title
                    issue["url"] = url
                
                if issue_list[index + 1] != None:
                    date = issue_list[index + 1].text.strip()
                    issue["date"] = date
                    
                issues.append(issue)
                
            print(f"Time taken: {time.time() - start_time}")
            
        except TimeoutError:
            print("Timeout")
        finally:
            await driver.close()
            
        return {
            "title": title,
            "other_name": other_name,
            "genres": genres,
            "publisher": publisher,
            "writer": writer,
            "artist": artist,
            "publication": publication,
            "summary": summary,
            "issues": issues
        }
    
    async def get_comic_book_issue(self,issue_url):
        # Get the comic book issue
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        page = await driver.newPage()
        await page.goto(f"{self.ROOT_URL}/{issue_url}&s=&quality=lq&readType=1", waitUntil="load")
        try:
            pages_list = await page.waitForSelector("#divImage")
            # Keep Scrolling the page until there is no more to scroll through
            last_height = await page.evaluate("document.body.scrollHeight")
            while True:
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight);")
                await asyncio.sleep(1)
                new_height = await page.evaluate("document.body.scrollHeight")
                if new_height == last_height:
                    break
                last_height = new_height
                
            # Scraping the issue now
            resp = await page.content()
            soup = BeautifulSoup(resp, "html.parser")
            pages_list = soup.find("div", id="divImage")
            
            page_imgs = []
            for page in pages_list.find_all("img"):
                page_imgs.append(page["src"])
            
        except TimeoutError: 
            pass
        finally:
            await driver.close()
        
        print(f"Time taken: {time.time() - start_time}")
        return page_imgs
    
    def extract_pg_src(self,page):
        return page["src"]
        
    
    def download_comic_issue(self, page_url):
        # Get the comic book page incase of the download option
        pass
    
    
if __name__ == "__main__":
    
    scraper = ComicBookScraper()
   
    # print(scraper.search_comic_book_series("Batman"))
    
    # example_url = 'Comic/The-Amazing-Spider-Man-2018'
    # print(scraper.get_comic_book_series(example_url))
    
    # issue_url = 'Comic/Batman-Forever-The-Official-Comic-Adaptation-of-the-Warner-Bros-Motion-Picture/Full?id=122064&s=&quality=hq&readType=1'
    # print(scraper.get_comic_book_issue(issue_url))
    
    async def main():
        # series = await scraper.search_comic_book_series("Batman")
        # print(series)
        # series = await scraper.get_comic_book_series("Comic/The-Amazing-Spider-Man-2018")
        # print(series)
        # pages = await scraper.get_comic_book_issue("/Comic/The-Amazing-Spider-Man-2018/Issue-93?id=196317")
        page = await scraper.get_home_page()
        print(page)
        

    asyncio.get_event_loop().run_until_complete(main())
    