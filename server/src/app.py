from flask import *
from flask_cors import CORS
from controllers import main_controller as mc
from flask import request

#Se inicia la aplicación
app = Flask(__name__)
CORS(app)

#Ruta para el borrado de un NPC
#Método: DELETE
@app.route("/deleteNpc", methods=["DELETE"])
def delete_npc():
    data = request.json
    return mc.delete_npc(data["name"])

#Ruta para el borrado de un logro
#Método DELETE
@app.route("/deleteAchievement", methods=["DELETE"])
def delete_achievement():
    data = request.json
    return mc.delete_achievement(data["name"])

#Ruta para la inserción de un nuevo elemento
#Método POST
@app.route("/insert", methods=["POST"])
def insert_element():
    return mc.add_element(request.json)

#Ruta para la obtención de los npcs
#Método GET
@app.route("/getNpcs", methods=["GET"])
def get_npcs():
    return mc.get_npcs()

#Ruta para la obtención de los nombres de los npcs
#Método GET
@app.route("/getNpcNames", methods=["GET"])
def get_npc_names():
    return mc.get_npc_names()

#Ruta para la obtención de NPCs filtrados.
#Método POST
@app.route("/getFilteredNpcs", methods=["POST"])
def get_filtered_npcs():
    filters = request.json
    return mc.get_filtered_npcs(filters)

#Ruta para la obtención de todos los logros
#Método GET
@app.route("/getAchievements", methods=["GET"])
def get_achievements():
    return mc.get_achievements()

#Ruta para la actualización de un NPC
#Método PUT
@app.route("/updateNpc", methods=["PUT"])
def update_npc():
    data = request.json
    return mc.update_npc(data)

#Ruta para la actualización de un logro
#Método PUT
@app.route("/updateAchievement", methods=["PUT"])
def update_achievement():
    data = request.json
    return mc.update_archievement(data)

#Ruta para la obtención de un NPC aleatorio
#Método GET
@app.route("/getRandomNpc", methods=["GET"])
def get_random_npc():
    return mc.get_random_npc()

#Ruta para la obtención de un NPC específico
#Método GET
@app.route("/getOneNpc/<name>", methods=["GET"])
def get_specific_npc(name):
    return mc.get_specific_npc(name)

#Ruta para la obtención de logros filtrados
#Método POST
@app.route("/getFilteredAchievements", methods=["POST"])
def get_filtered_achievements():
    req = request.json
    return mc.get_filtered_achievements(req)

#Ruta para la obtención de una lista con nombres de NPCs aleatorios y uno elegido. 
#Método POST
@app.route("/getNpcChoices", methods=["POST"])
def get_npc_choices():
    name = request.json
    return mc.get_npc_options(name)