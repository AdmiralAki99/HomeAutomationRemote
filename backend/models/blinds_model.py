from sqlmodel import Field, SQLModel

class Blind(SQLModel, table=True):
    
    """
    Blind model for the database table.
        id: int - primary key
        name: str - name of the blind
        status: bool - status of the blind
        ip: str - ip address of the blind
    """
    
    id: int = Field(primary_key=True)
    name: str = Field(max_length=100)
    status: bool = Field()
    ip: str = Field(max_length=15)