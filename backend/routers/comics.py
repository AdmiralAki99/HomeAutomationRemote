from fastapi import APIRouter, HTTPException,BackgroundTasks
from services.comic_scraper import ComicBookScraper
import time

router = APIRouter()

scraper = ComicBookScraper()

@router.get("/")
def read_root():
    return {"Hello": "World Comics"}

@router.get("/get/homepage")
async def get_comic_book_homepage():
    """Get the homepage of the comic book scraper"""
    try:
        return await scraper.get_home_page()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/search")
async def search_comic_book_series(query: str,background_tasks: BackgroundTasks):
    """Search for a comic book series"""
    try:
        return await scraper.search_comic_book_series(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/search/series")
async def get_comic_book_series(query: str):
    """Get the issues of a comic book series"""
    try:
        return await scraper.get_comic_book_series(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/search/issue")
async def get_comic_book_issue(query: str):
    """Get the pages of a comic book issue"""
    try:
        return await scraper.get_comic_book_issue(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/download/issue")
async def download_comic_book_issue(query: str):
    """Download the pages of a comic book issue"""
    try:
        ## TODO: Look to implement a downloading option for the comic book scraper
        return {'message': 'Downloaded'}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))