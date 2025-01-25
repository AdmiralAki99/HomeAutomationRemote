from fastapi import APIRouter, Query, HTTPException
from services.remote_controller import RemoteController

router = APIRouter()

remote_controller = RemoteController()

@router.get("/")
def read_root():
    return {"Hello" : "Remote Router"}

@router.get("/send/key")
def send_key(query: str):
    try:
        print(f"Sending key: {query}")
        remote_controller.trigger_key(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending key: {e}")
    return {"status" : "ok"}

@router.get("/add/device")
def add_device(ip: str):
    try:
        device = remote_controller.add_device(ip)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding device: {e}")
    return {"status" : "ok"}