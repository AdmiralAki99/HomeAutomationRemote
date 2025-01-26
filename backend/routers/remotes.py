from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from services.remote_controller import RemoteController
from models.firestick_model import Firestick, create_firestick

router = APIRouter()

# Lazy loading the session dependency to stop circular imports
def create_session_dependency():
    from app import get_session
    return Annotated[Session, Depends(get_session)]


DBSessionDependency = create_session_dependency()
remote_controller = RemoteController()


@router.get("/")
def read_root():
    return {"Hello": "Remote Router"}


@router.get("/send/key")
def send_key(query: str):
    """
    Function to send a key to the firestick.
    query: str - the key to send to the firestick
    """
    try:
        print(f"Sending key: {query}")
        remote_controller.trigger_key(query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending key: {e}")
    return {"status": "ok"}


@router.get("/connect/device")
def conenct_to_device(ip: str):
    """
    Function to connect to a device to the remote controller.
    ip: str - the IP address of the device to add
    """
    try:
        device = remote_controller.add_device(ip)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding device: {e}")
    return {"status": "ok"}


@router.get("/init")
def init_remote():
    """
    Function to initialize the remote controller.
    """
    try:
        # Need to see if there is a primary device
        primary_device = check_if_primary_device_exists(session)
        if primary_device:
            # If there is a primary device which is stored then it needs to be connected to
            remote_controller.add_device(primary_device.ip)

        # There is no primary device so do nothing
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error initializing remote: {e}")
    return {"status": "ok"}


@router.post("/create")
def create_remote_record(remote: dict, session: DBSessionDependency):
    """
    Function to create a remote record in the database.
    remote: dict - the dictionary containing the remote details
    """
    # Check the body of the request
    if not remote:
        raise HTTPException(status_code=400, detail="No request body found")
    # Check if the dictionary has the required keys
    if not all(key in remote for key in ["name", "status", "ip"]):
        raise HTTPException(
            status_code=400, detail="Missing required keys in the request body"
        )
   
   # Check if the device exists
    try:
        device = check_if_device_exists(remote["ip"], session)
        if device:
            raise HTTPException(
                status_code=400, detail="A device with the same IP already exists"
            )
        
        # Device does not exist so we can create it
        response = create_remote(remote, session)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error checking if device exists: {e}"
        )

    # Return a response
    return {"status": "ok" if response else "error"}


@router.get("/get/all")
def get_remotes(session: DBSessionDependency):
    """
    Function to get all remotes from the database.
    """
    try:
        remotes = get_all_remotes(session)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting remotes: {e}")
    return {
        "remotes": [
            {"id": remote.id, "name": remote.name, "primary": remote.is_primary, "status": remote.status, "ip": remote.ip}
            for remote in remotes
        ] if remotes else None
    }


@router.post("/set/status")
def set_remote_status(ip: str, status: bool, session: DBSessionDependency):
    """
    Function to set the status of a remote.
    ip: str - the IP address of the remote
    """
    try:
       # Checking if the remote exists in the database
        remote = check_if_device_exists(ip, session)
        if not remote:
            raise HTTPException(status_code=404, detail="Remote not found")
        
        # Setting the status of the remote since it exists
        remote = set_remote_status(ip=ip,status=status,session=session)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error setting remote status: {e}")
    return {
        "status": "ok",
        "updated_status": remote.status
        } if remote else {"status": "error"}
    

def change_remote_name(ip: str, name: str, session: DBSessionDependency):
    """
    Function to change the name of a remote.
    ip: str - the IP address of the remote
    name: str - the new name of the remote
    """
    try:
        remote = set_remote_name(ip, name, session)
       
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error setting remote name: {e}")
    return remote if remote else None


@router.post("/delete")
def delete_remote(ip: str, session: DBSessionDependency):
    """
    Function to delete a remote from the database.
    ip: str - the IP address of the remote
    """
    try:
        # Check if the remote exists
        remote = check_if_device_exists(ip, session)
        if not remote:
            raise HTTPException(status_code=404, detail="Remote not found")
        
        # Remote exists
        response = delete_remote(ip, session)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting remote: {e}")
    return {"status": "ok" if response else "error"}


@router.get("/get/device")
def get_device(ip: str, session: DBSessionDependency):
    """
    Function to get a device from the database.
    ip: str - the IP address of the device
    """
    try:
        # Need to check if the device exists
        device = check_if_device_exists(ip, session)
        if not device:
            raise HTTPException(status_code=404, detail="Device not found")
        
        # Device exists
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting device: {e}")
    return {
        "id": device.id,
        "name": device.name,
        "primary": device.is_primary,
        "status": device.status,
        "ip": device.ip,
    }


@router.get("/get/primary")
def get_primary_device(session: DBSessionDependency):
    """
    Function to get the primary device from the database.
    """
    try:
        device = get_primary_device(session)
        if not device:
            raise HTTPException(status_code=404, detail="Primary device not found")
        
        # Device exists
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error getting primary device: {e}"
        )
    return {
        "id": device.id,
        "name": device.name,
        "status": device.status,
        "ip": device.ip,
    }
    
    
@router.post("/set/primary")
def set_primary_device(ip:str, session: DBSessionDependency):
    """
    Function to set the primary device in the database.
    ip: str - the IP address of the device to set as primary
    """
    # Check if there is a primary device
    try:
        primary_device = check_if_primary_device_exists(session)
        if primary_device:
           # Set the primary device to false
           set_remote_not_primary(primary_device.ip, session)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error getting primary device: {e}"
        )
        
    # Set the new primary device
    try:
        set_remote_primary(ip, session)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error setting primary device: {e}"
        )
        
    return {"status":"ok"}




## Utility functions SQL functions like get, create, update, delete

def check_if_device_exists(ip: str, session: DBSessionDependency):
    """
    Function to check if a device exists in the database.
    ip: str - the IP address of the device
    """
    try:
        device = session.exec(
            select(Firestick).where(Firestick.ip == ip)
        ).first()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error checking if device exists: {e}"
        )
    return device if device else None

def check_if_primary_device_exists(session: DBSessionDependency):
    """
    Function to check if a primary device exists in the database
    """
    try:
        device = session.exec(
            select(Firestick).where(Firestick.is_primary == True)
        ).first()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error checking if primary device exists: {e}"
        )
    return device if device else None

def get_primary_device(session: DBSessionDependency):
    """
    Function to get the primary device from the database.
    """
    try:
        device = check_if_primary_device_exists(session)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error getting primary device: {e}"
        )
    return device if device else None

def get_all_remotes(session: DBSessionDependency):
    """
    Function to get all remotes from the database.
    """
    try:
        # Simple query to get all remotes, no need for complex validation
        
        remotes = session.exec(select(Firestick)).all() # Querying the database for all remotes
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting remotes: {e}")
    return remotes if remotes else None

def create_remote(remote: dict, session: DBSessionDependency):
    """
    Function to create a remote in the database.
    remote: dict - the dictionary containing the remote details
    """
    try: 
        # Check if there exists a device with the same IP since the IP is unique
        existing_device = check_if_device_exists(remote["ip"], session)
        
        if existing_device:
            raise HTTPException(
                status_code=400, detail="A device with the same IP already exists"
            )
            
        # Check if there is a primary device
        primary_device = check_if_primary_device_exists(session)
        
        if primary_device:
            remote["is_primary"] = False
        else:
            remote["is_primary"] = True
            
        # Create the firestick model
        model = create_firestick(remote["name"], remote["is_primary"],remote["status"], remote["ip"])
        # Add the model to the database
        session.add(model)
        session.commit()
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating remote: {e}")
    
    return True if model else False
        
def set_remote_status(ip: str, status: bool, session: DBSessionDependency):
    """
    Function to set the status of a remote.
    ip: str - the IP address of the remote
    status: bool - the status of the remote
    """
    try:
        remote = check_if_device_exists(ip, session)
        # Need to check if the remote exists
        if not remote:
            raise HTTPException(status_code=404, detail="Remote not found")
        remote.status = status
        session.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error setting remote status: {e}")
    return remote if remote else None

def delete_remote(ip: str, session: DBSessionDependency):
    """
    Function to delete a remote from the database.
    ip: str - the IP address of the remote
    """
    try:
        remote = check_if_device_exists(ip, session)
        if not remote:
            raise HTTPException(status_code=404, detail="Remote not found")
        
        session.delete(remote)
        session.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting remote: {e}")
    return True if remote else False

def set_remote_primary(ip: str, session: DBSessionDependency):
    """
    Function to set a remote as primary.
    ip: str - the IP address of the
    """
    try:
        remote = check_if_device_exists(ip, session)
        if not remote:
            raise HTTPException(status_code=404, detail="Remote not found")
        
        remote.is_primary = True
        session.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error setting remote primary: {e}")
    return remote if remote else None

def set_remote_not_primary(ip: str, session: DBSessionDependency):
    """
    Function to set a remote as not primary.
    ip: str - the IP address of the remote
    """
    try:
        remote = check_if_device_exists(ip, session)
        if not remote:
            raise HTTPException(status_code=404, detail="Remote not found")
        
        remote.is_primary = False
        session.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error setting remote not primary: {e}")
    return remote if remote else None

def set_remote_name(ip: str, name: str, session: DBSessionDependency):
    """
    Function to set the name of a remote.
    ip: str - the IP address of the remote
    name: str - the new name of the remote
    """
    try:
        remote = check_if_device_exists(ip, session)
        if not remote:
            raise HTTPException(status_code=404, detail="Remote not found")
        
        remote.name = name
        session.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error setting remote name: {e}")
    return remote if remote else None

