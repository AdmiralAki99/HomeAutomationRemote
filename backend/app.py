import os
import signal
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import comics, movies, shows, animes
import uvicorn

# Create an instance of FastAPI
app = FastAPI()

# Define a route that returns a JSON response
app.include_router(comics.router,prefix="/comics",tags=["comics"])
app.include_router(movies.router,prefix="/movies",tags=["movies"])
app.include_router(shows.router,prefix="/tv",tags=["tv"])
app.include_router(animes.router,prefix="/animes",tags=["animes"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.get("/shutdown")
def shutdown_server():
    os.kill(os.getpid(),signal.SIGINT)
    return {"message":"Server shutting down"}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)