from fastapi import FastAPI
from pymongo import MongoClient
from model import Problem
from typing import List, Optional

app = FastAPI()
client = MongoClient()
db = client["po-ping"]


@app.get("/problems", response_model=List[Problem])
async def get_problems():
    return list(db["problems"].find({}))


@app.get("/problems/{id}", response_model=Problem)
async def get_problem(id: str):
    return db["problems"].find_one({"_id": id})
