from fastapi import FastAPI
from pymongo import MongoClient

app = FastAPI()
client = MongoClient()
db = client["po-ping"]


@app.get("/problems")
async def get_problems():

    return list(db["problems"].find({}))
