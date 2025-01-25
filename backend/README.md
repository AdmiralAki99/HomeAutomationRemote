## Backend Structure

```
/backend
├── app.py                     # Main FastAPI app
├── routers                    # Directory for route modules
│   ├── comics.py              # Route for comic scraping
│   ├── manga.py               # Route for manga API handling
│   ├── anime.py               # Route for anime scraping
│   ├── movies.py              # Route for movie scraping
│   ├── remotes.py             # Route for remote controlling
├── services                   # Directory for service modules (business logic)
│   ├── comic_scraper.py       # Comic scraping logic
│   ├── anime_scraper.py       # Anime scraping logic
│   ├── movie_scraper.py       # Movie scraping logic
│   ├── tv_show_scraper.py     # Show scraping logic
│   ├── remote_controller.py   # FireStick TV remote controller
├── utils                      # Directory for utilities
└── requirements.txt           # Python dependencies
```