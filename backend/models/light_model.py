from sqlmodel import Field, SQLModel

class Light(SQLModel, table=True):
    
    """
    Light model for the database table.
        id: int - primary key
        name: str - name of the light
        status: bool - status of the light
        brightness: int - brightness of the light
        color: str - color of the light
        ip: str - ip address of the light
    """
    
    id: int = Field(primary_key=True)
    name: str = Field(max_length=100)
    status: bool = Field()
    brightness: int = Field()
    color: str = Field(max_length=7)
    ip: str = Field(max_length=15)
    
