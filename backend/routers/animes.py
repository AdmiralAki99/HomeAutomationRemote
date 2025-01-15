from fastapi import APIRouter, Query, HTTPException
from services.anime_scraper import AnimeScraper
import time
import json

router = APIRouter()

scraper = AnimeScraper()

@router.get("/")
def read_root():
    return {"Hello" : "Anime Router"}

@router.get("/search")
async def search_anime(link: str):
    try:
        return await scraper.search_anime(link)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/get/homepage")
async def get_homepage():
    try:
        return await scraper.get_homepage()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/get/info")
async def get_anime_info(link: str):
    try:
        return await scraper.get_anime_info(link)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/get/episode/link")
async def get_episode_link(link: str,ep: str):
    try:
        if ep == None:
            return await scraper.get_anime_link(link)
        return await scraper.get_anime_link(f'{link}&ep={ep}')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
router.get
    
@router.get("/get/episode/change/server")
async def change_server_link(link: str, server_id: str):
    try:
        return await scraper.change_server(link,server_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
    