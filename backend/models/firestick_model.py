from sqlmodel import Field, SQLModel

class Firestick(SQLModel, table=True):
    
    """
    Firestick model for the database table.
        id: int - primary key
        name: str - name of the firestick
        is_primary: bool - whether the firestick is primary
        status: bool - status of the firestick
        ip: str - ip address of the firestick
    """
    
    id: int = Field(primary_key=True)
    name: str = Field(max_length=100)
    is_primary: bool = Field(nullable=True,default=False)
    status: bool = Field()
    ip: str = Field(max_length=15)
    

def create_firestick(name: str, is_primary: bool ,status: bool, ip: str):
    """
    Function to create a firestick model.
    """
    return Firestick(name=name, is_primary=is_primary , status=status, ip=ip)