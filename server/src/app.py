from flask import *
from flask_cors import CORS
from controllers import main_controller as mc
from flask import request
app = Flask(__name__)

CORS(app)

@app.route("/get")
def get_all():
    return mc.test_get()

@app.route("/delete", methods=["DELETE"])
def delete_npc():
    name = request.json
    return mc.delete_npc(name["name"])

@app.route("/insert", methods=["POST"])
def insert_npc():
    return mc.add_npc(request.json)

@app.route("/getNpcs", methods=["GET"])
def get_npcs():
    return mc.get_npcs()

@app.route("/getAchievements", methods=["GET"])
def get_achievements():
    return mc.get_achievements()