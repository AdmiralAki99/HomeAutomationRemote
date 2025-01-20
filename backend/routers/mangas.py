from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import JSONResponse
from services.manga_scraper import MangaScraper
import time
import json

router = APIRouter()
scraper = MangaScraper()

@router.get("/")
def read_root():
    return {"Hello" : "Manga Router"}

@router.get("/search",response_class=JSONResponse)
async def search_manga(query: str):
    try:
        return await scraper.search_manga(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/get/chapter/list")
async def search_chapter(manga_id: str):
    try:
        return scraper.get_chapter_list(manga_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/get/chapter/pages",response_class=JSONResponse)
async def search_chapter_pages(chapter_id: str):
    try:
        return await scraper.get_chapter_pages(chapter_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
