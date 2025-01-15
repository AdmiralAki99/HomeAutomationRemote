from fastapi import APIRouter, Query, HTTPException
from services.movie_scraper import MovieScraper
import time

router = APIRouter()

scraper = MovieScraper()

# TODO: Add a save feature for later purposes if needed

@router.get("/")
def read_root():
    return {"Hello" : "Movie Router"}

@router.get("/search")
async def search_movie(query: str):
    try:
        return await scraper.search_media(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/get/homepage")
async def get_homepage():
    try:
        return await scraper.get_homepage()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/get/link")
async def get_movie_link(query: str):
    try:
        return await scraper.get_movie(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/get/info")
async def get_movie_info(query: str):
    try:
        return await scraper.get_movie_info(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/get/change/server")
async def change_server_link(link: str, server_name: str):
    try:
        return await scraper.change_server(link,server_name)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))