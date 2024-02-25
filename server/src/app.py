from flask import *
from flask_cors import CORS
from controllers import main_controller as mc
from flask import request
app = Flask(__name__)

CORS(app)


@app.route("/deleteNpc", methods=["DELETE"])
def delete_npc():
    data = request.json
    return mc.delete_npc(data["name"])

@app.route("/deleteAchievement", methods=["DELETE"])
def delete_achievement():
    data = request.json
    return mc.delete_achievement(data["name"])

@app.route("/insert", methods=["POST"])
def insert_npc():
    return mc.add_element(request.json)

@app.route("/getNpcs", methods=["GET"])
def get_npcs():
    return mc.get_npcs()

@app.route("/getNpcNames", methods=["GET"])
def get_npc_names():
    return mc.get_npc_names()

@app.route("/getFilteredNpcs", methods=["POST"])
def get_filtered_npcs():
    filters = request.json
    return mc.get_filtered_npcs(filters)

@app.route("/getAchievements", methods=["GET"])
def get_achievements():
    return mc.get_achievements()

@app.route("/updateNpc", methods=["PUT"])
def update_npc():
    data = request.json
    return mc.update_npc(data)

@app.route("/updateAchievement", methods=["PUT"])
def update_achievement():
    data = request.json
    return mc.update_archievement(data)

@app.route("/getRandomNpc", methods=["GET"])
def get_random_npc():
    return mc.get_random_npc()

@app.route("/getOneNpc/<name>", methods=["GET"])
def get_specific_npc(name):
    return mc.get_specific_npc(name)

@app.route("/getFilteredAchievements", methods=["POST"])
def get_filtered_achievements():
    req = request.json
    return mc.get_filtered_achievements(req)