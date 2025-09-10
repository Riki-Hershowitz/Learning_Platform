from pydantic import BaseModel, Field

class SubCategoryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    category_id: str

class SubCategoryOut(BaseModel):
    id: str
    name: str
    category_id: str
