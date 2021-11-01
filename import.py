from glob import glob
import yaml
from poping.model import Problem
import os
from pymongo import MongoClient
from bson import ObjectId


client = MongoClient()
db = client["po-ping"]

for filename in glob("problems/*.yaml"):

    with open(filename) as file:

        name = os.path.basename(filename).replace(".yaml", "")
        data = yaml.load(file, yaml.FullLoader)
        data["filename"] = filename
        problem = Problem(**data).dict()

        problem["_id"] = name

        db.problems.replace_one({"_id": name}, problem, upsert=True)

    pass
