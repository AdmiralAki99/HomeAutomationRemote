import time
import pyppeteer
import asyncio
from bs4 import BeautifulSoup

class AnimeScraper:
    
    ROOT_URL = "https://anigo.co"
    
    def __init__(self):
        pass
    
    async def search_anime(self,anime_name):
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        page = await driver.newPage()
        
        await page.goto(f'{self.ROOT_URL}/search/?query={anime_name.replace(" ","%20")}')
        
        try:
            # Wait for the page to load
            await page.waitForSelector(".results-container .card")
            time.sleep(1.5)
            
            soup = BeautifulSoup(await page.content(),"html.parser")
            results_container = soup.find("div",class_="results-container")
            results = results_container.find_all("a",class_="card")
            
            response = []
            for result in results:
                link = result['href']
                footer = result.find("div",class_="card-footer")
                duration = footer.find_all("p")[0].text
                result_type = footer.find_all("p")[1].text
                result_title = result.find("div",class_="card-title")
                title = result_title.find("a").text
                img = result.find("img")['src']
                response.append({
                    "title": title,
                    "duration": duration,
                    "type": result_type,
                    "link": link,
                    "img": img
                })   
        except TimeoutError:
            print("Timeout")
        finally:
            await driver.close()
        
        print(f"Time taken: {time.time() - start_time}")
        return response
    
    async def get_anime_info(self,anime_link):
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        page = await driver.newPage()
        
        await page.goto(f'{self.ROOT_URL}{anime_link}')
        
        try:
            # Wait for the page to load
            await page.waitForSelector(".episode-item")
            time.sleep(1.5)
            
            soup = BeautifulSoup(await page.content(),"html.parser")
            episode_list = soup.find("div",class_="episode-list")
            episode_list = episode_list.find("ul",class_="list")
            episodes = episode_list.find_all("li",class_="episode-item")
            
            response = []
            for index in range(len(episodes)):
                episode_link = episodes[index].find("a")['href']
                episode_title = episodes[index].find("a").text.split(".")[1].strip()
                response.append({
                    "Episode No": index+1,
                    "Episode Title": episode_title,
                    "Episode Link": episode_link
                })
                
            # Get the poster and get the title and description
            information = soup.find("div",class_="information")
            poster = information.find("img")['src']
            sub_info = information.find("div",class_="sub-info")
            title = sub_info.find("p",class_="info-title").text
            description = sub_info.find("p",class_="info-description").text
            info_type = sub_info.find("p",class_="info-type").text
            info_duration = sub_info.find("p",class_="info-duration").text
            info_date = sub_info.find("p",class_="info-date").text
            info_episodes = sub_info.find("p",class_="info-episodes").text.strip().split("Episodes:")[1]
            info_status = sub_info.find("p",class_="info-status").text
            info_studio = sub_info.find("p",class_="info-studio").text
            info_producers = sub_info.find("p",class_="info-producers").text
            
        except TimeoutError:
            print("Timeout")
        finally:
            await driver.close()
            
        print(f"Time taken: {time.time() - start_time}")
            
        return({
                "title": title,
                "episodes": response,
                "description": description,
                "type": info_type,
                "duration": info_duration,
                "date": info_date,
                "episodes_count": info_episodes,
                "status": info_status,
                "studio": info_studio,
                "producers": info_producers,
                "poster": poster
            })
    
    async def get_anime_link(self,episode_link):
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        page = await driver.newPage()
        
        await page.goto(f'{self.ROOT_URL}{episode_link}')
        
        try:
            # Wait for the page to load
            await page.waitForSelector(".iframe-container")
            
            # Need to wait until the source is loaded
            while True:
                soup = BeautifulSoup(await page.content(),"html.parser")
                iframe = soup.find("iframe")
                if iframe['src'] != "":
                    break
                time.sleep(1)
                    
            iframe = await page.querySelector("iframe")
            default_source = await page.evaluate('(iframe) => iframe.src', iframe)
            
            # Getting the sever links
            server_table = soup.find("div",class_="servers-table")
            servers = server_table.find("div",class_="servers")
            server_info = {}
            for server_type in servers.find_all("div",recursive=False):
                server_category = server_type.find("p").text
                server_list = server_type.find("div")
                server_list = server_list.find_all("button")
                server_info[server_category] = []
                for server in server_list:
                    
                    server_info[server_category].append({"server_name": server.text, "server_id": server['id']})
        except TimeoutError:
            print("Timeout")
        finally:
            await driver.close()
            
        print(f"Time taken: {time.time() - start_time}")
            
        return {
            "default_source": default_source,
            "servers": server_info
        }
        
    async def change_server(self,anime_link,server_id):
        start_time = time.time()
        driver = await pyppeteer.launch(executablePath=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
        page = await driver.newPage()
        
        await page.goto(f'{self.ROOT_URL}{anime_link}')
        
        try:
            # Wait for the page to load
            await page.waitForSelector(".iframe-container")
            
            # Need to wait until the source is loaded
            while True:
                soup = BeautifulSoup(await page.content(),"html.parser")
                iframe = soup.find("iframe")
                if iframe['src'] != "":
                    break
                time.sleep(1)
                
            # Now the server needs to be changed
            server_button = await page.querySelector(f"#{server_id}")
            
            # Click the server toggle button
            try:
                # Try clicking directly first
                await server_button.click()
            except pyppeteer.errors.ElementHandleError:
                print("Element click intercepted, using JavaScript click...")
                await page.evaluate('(server_button) => server_button.click()', server_button)
                
            # Wait for the source to load
            await page.waitForSelector(".iframe-container")
            
            # Need to wait until the source is loaded
            while True:
                soup = BeautifulSoup(await page.content(),"html.parser")
                iframe = soup.find("iframe")
                if iframe['src'] != "":
                    break
                time.sleep(1)
                
            iframe = await page.querySelector("iframe")
            default_source = await page.evaluate('(iframe) => iframe.src', iframe)
            
        except TimeoutError:
            print("Timeout")
        finally:
            await driver.close()
            
        print(f"Time taken: {time.time() - start_time}")
            
        return {
            "default_source": default_source
        }
        
    # def change_server(self,anime_link,server_id):
        
    #     driver = webdriver.Chrome(options=self.options)
    #     driver.get(f'{self.ROOT_URL}{anime_link}')
    #     try:
    #         WebDriverWait(driver,10).until(
    #             EC.presence_of_element_located((By.CLASS_NAME,"iframe-container"))
    #         )
            
    #         # Need to wait until the source is loaded
    #         while True:
    #             soup = BeautifulSoup(driver.page_source,"html.parser")
    #             iframe = soup.find("iframe")
    #             if iframe['src'] != "":
    #                 break
    #             time.sleep(1) 
                
    #         # Now the server needs to be changed
    #         server_button = driver.find_element(By.ID,server_id)
            
    #         # Click the server toggle button
    #         try:
    #             # Try clicking directly first
    #             server_button.click()
    #         except ElementClickInterceptedException:
    #             print("Element click intercepted, using JavaScript click...")
    #             driver.execute_script("arguments[0].click();", server_button)
                
    #         # Wait for the source to load
    #         WebDriverWait(driver,10).until(
    #             EC.presence_of_element_located((By.CLASS_NAME,"iframe-container"))
    #         )
            
    #         # Need to wait until the source is loaded
    #         while True:
    #             soup = BeautifulSoup(driver.page_source,"html.parser")
    #             iframe = soup.find("iframe")
    #             if iframe['src'] != "":
    #                 break
    #             time.sleep(1)
                
    #         iframe = driver.find_element(By.TAG_NAME,"iframe")
            
    #         default_source = iframe.get_attribute("src")
            
    #     except TimeoutException:
    #         print("Timeout")
    #     finally:
    #         driver.quit()
            
    #     return {
    #         "default_source": default_source
    #     }
            
    
    
    
if __name__ == "__main__":
     
    scraper = AnimeScraper()
    # print(scraper.search_anime("haikyuu"))
   
    # print(scraper.get_anime_info("/watch/?id=haikyu-3rd-season-18"))
    
    # print(scraper.get_anime_link("/watch/?id=haikyu-3rd-season-18&ep=765"))
    
    # print(scraper.change_server("/watch/?id=haikyu-3rd-season-18&ep=765","s2-s"))
    
    async def main():
        # search = await scraper.search_anime("haikyuu")
        # print(search)
        info = await scraper.get_anime_info("/watch/?id=log-horizon-514")
        print(info)
        # link = await scraper.get_anime_link("/watch/?id=haikyu-3rd-season-18&ep=765")
        # print(link)
        # change = await scraper.change_server("/watch/?id=haikyu-3rd-season-18&ep=765","s2-d")
        # print(change)

    asyncio.get_event_loop().run_until_complete(main())
    

    
    
    
        
            
            
            