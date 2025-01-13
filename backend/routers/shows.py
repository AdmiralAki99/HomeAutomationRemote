from fastapi import APIRouter, Query, HTTPException
from services.tv_scraper import TvScraper
import time
import json

router = APIRouter()

scraper = TvScraper()

@router.get("/")
def read_root():
    return {"Hello" : "TV Router"}

@router.get("/search")
async def search_show(query: str):
    try:
        return await scraper.search_show(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/get/info")
async def get_show_info(query: str):
    try:
        return await scraper.get_show_info(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/get/season")
async def get_season(link: str,season_number: int):
    try:
        return await scraper.get_show_season_info(link,season_number)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/get/episode/source")
async def get_episode_source(link: str,season_number: int,episode_number: int):
    try:
        return await scraper.get_episode_source_url(link,season_number,episode_number)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/get/episode/change/server")
async def change_server_link(link: str,season_number: int,episode_number: int, server_name: str):
    try:
        return await scraper.change_server(link,season_number,episode_number,server_name)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))