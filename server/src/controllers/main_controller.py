from  config.database import DB
from boto3 import *
from boto3.dynamodb.conditions import Key
from boto3.dynamodb.conditions import Attr
import random

#Inicializamos la tabla en una variable para realizar operaciones con npcs (aldeanos) y achievements (logros)
STARDEW = DB.Table("StardewValley")

#
# Pre:---
# Post: Método para añadir un nuevo elemento en la base de datos. Comprueba si es un achievement para obtener
# en caso afirmativo la id de logro nueva a procesar. Analiza si se trata de un único objeto o varios y los inserta.
# @params: data
#
def add_element(data):

    if(isinstance(data, list)):
        for element in data:
            if element["type"] == "achievement":
                element["id"] = get_new_achievement_id()
            STARDEW.put_item(
                Item = element
            )
        return "Items added"
    else:
        if data["type"] == "achievement":
            data["id"] = get_new_achievement_id()
        STARDEW.put_item(
            Item=data
        )
        return "Item added"
    

#
# Pre:---
# Post: Método para obtener los únicamente nombres de los NPCs. Devuelve una lista de strings
#
def get_npc_names():
    
    names = []

    npcs = STARDEW.query(
        KeyConditionExpression=Key("type").eq("npc")
    )["Items"]

    for npc in npcs:
        names.append(npc["name"])

    return names

#
# Pre:---
# Post: Función para la obtención de los NPCs. Busca por clave npc
#
def get_npcs():
    
    npcs = STARDEW.query(
        KeyConditionExpression=Key("type").eq("npc")
    )

    return npcs["Items"]

#
# Pre:---
# Post: Función para el filtrado de aldeanos. Recoge un diccionario con los filtros como parámetro, analiza la cantidad de
# condiciones a aplicar y realiza la sentencia correspondiente contra la base de datos. En caso de que los filtros estén vacíos
# simplemente devuelve todos los aldeanos sin filtrar.
# @params: filters
#
def get_filtered_npcs(filters: dict):
    keys = list(filters.keys())
    values = list(filters.values())
    if len(keys) == 1:
        npcs = STARDEW.query(
            KeyConditionExpression=Key("type").eq("npc"),
            FilterExpression=Attr(keys[0]).eq(values[0])
        )["Items"]
    elif len(keys) == 2:
        npcs = STARDEW.query(
            KeyConditionExpression=Key("type").eq("npc"),
            FilterExpression=Attr(keys[0]).eq(values[0]) & Attr(keys[1]).eq(values[1])
        )["Items"]
    elif len(keys) == 3:
        npcs = STARDEW.query(
            KeyConditionExpression=Key("type").eq("npc"),
            FilterExpression=Attr(keys[0]).eq(values[0]) & Attr(keys[1]).eq(values[1]) & 
                Attr(keys[2]).eq(values[2])
        )["Items"]
    else:
        return get_npcs()
    return npcs

#
# Pre:---
# Post: Método encargado del borrado de un npc. Recibe como parámetro su nombre, lo busca aplicando la condición de 
# clave npc y lo borra.
# @params: name_npc
#
def delete_npc(name_npc):

    response = STARDEW.delete_item(
        Key={
            "type":"npc",
            "name":name_npc
        }
    )

    return response

#
# Pre:---
# Post: Método encargado del borrado de logros. Recibe el nombre por parámetro, lo busca en la base de datos con clave tipo
# achievement y lo borra.
# @params: name_achievement
#
def delete_achievement(name_achievement):

    response = STARDEW.delete_item(
        Key={
            "type":"achievement",
            "name":name_achievement
        }
    )
    
    return response

#
# Pre:---
# Post: Función para la obtención de los logros. Realiza una búsqueda por clave tipo: achievement y lo guarda en una variable.
# Como los logros tienen un atributo para guardar un la ID de un logro de prerequisito si lo poseen; la función reemplaza dicha
# ID por el nombre del logro al que corresponde. Una vez finalizado el reemplazo, devuelve los logros.
#
def get_achievements():
    response = STARDEW.query(
        KeyConditionExpression=Key("type").eq("achievement")
    )

    achievements = response["Items"]
    for achievement in achievements:
        for a in achievements:
            try:
                if(int(achievement["prerequisite_achievement"]) == int(a["id"])):
                    achievement["prerequisite_achievement"] = a["name"]
            except:
                print("Warning: Achievement already has a prerequisite")
            

    return achievements

#
# Pre:---
# Post: Método para actualizar un npc. Recibe datos con todos los atributos del aldeano incluyendo los cambios a realizar. Una
# vez encuentra el registro a actualizar, aplica los cambios a cada atributo y devuelve el registro actualizado.
# @params: data
#
def update_npc(data):
 
    response = STARDEW.update_item(
        Key={
            "type":"npc",
            "name":data["name"]
        },
        UpdateExpression = "SET age = :age, manners = :ma, social_anxiety = :sa, optimism = :op, gender = :g, datable = :da, love_interest = :li, home_region = :hr, birthday = :br",
        ExpressionAttributeValues={
            ":age": data["age"],
            ":ma": data["manners"],
            ":sa": data["social_anxiety"],
            ":op": data["optimism"],
            ":g": data["gender"],
            ":da": data["datable"],
            ":li": data["love_interest"],
            ":hr": data["home_region"],
            ":br": data["birthday"],
        },
        ReturnValues="ALL_NEW",
    )
    return response

#
# Pre:---
# Post: Método para actualizar un logro. Recibe datos con todos los atributos del logro incluyendo los cambios a realizar. Una
# vez encuentra el registro a actualizar por su tipo y nombre, aplica los cambios a cada atributo y devuelve
# el registro actualizado.
# @params: data 
#
def update_archievement(data):

    response = STARDEW.update_item(
        Key={
            "type":"achievement",
            "name":data["name"]
        },
        UpdateExpression = "SET description = :de, display_on_collections_tab_before_earned = :doctbe, hat_earned = :he, id = :id, img = :img, prerequisite_achievement = :pa",
        ExpressionAttributeValues={
            ":de": data["description"],
            ":doctbe": data['display_on_collections_tab_before_earned'],
            ":he": data['hat_earned'],
            ":id": data["id"],
            ":img": data["img"],
            ":pa": data['prerequisite_achievement'],
        },
        ReturnValues="ALL_NEW",
    )
    return response

#
# Pre:---
# Post: Método para la obtención de un npc aleatorio. Se obtiene la lista de npcs y usando la libreria Random se escoge
# y se devuelve uno aleatorio
#
def get_random_npc():
    
    npcs = STARDEW.query(
    KeyConditionExpression=Key("type").eq("npc")
    )["Items"]

    chosen_npc = random.choice(npcs)

    return chosen_npc

#
# Pre:---
# Post: Función para obtener un npc según su nombre. Simplemente se llama a una sentencia get individual con el nombre como
# condición.
# @param: name
#
def get_specific_npc(name):
    npc = STARDEW.get_item(
        Key={
            "type": "npc",
            "name":  name
        }
    )

    return npc["Item"]

#
# Pre:---
# Post: Método para obtener la siguiente ID a procesar de los logros. Obtiene la lista y la recorre analizando las ids para
# devolver el un número mayor por uno al valor máximo.
#
def get_new_achievement_id():
    achievements = get_achievements()

    maxId = 0
    for achievement in achievements:
        if maxId < int(achievement["id"]):
            maxId = int(achievement["id"])
    
    return maxId + 1

#
# Pre:---
# Post: Método para filtrar logros según la existencia de un prerequisito. Recibe la orden de filtrar por logros que posean
# dicho requisito o no. Devuelve finalmente una lista filtrada.
#
def get_filtered_achievements(req):
    
    filtered_achievements = []
    achievements = get_achievements()
    for achievement in achievements:
        if req["needs_pre"] == "checked" and achievement["prerequisite_achievement"] != -1:
            filtered_achievements.append(achievement)
        elif req["needs_pre"] == "unchecked" and achievement["prerequisite_achievement"] == -1:
            filtered_achievements.append(achievement)
    return filtered_achievements

#
# Pre:---
# Post: Método para obtener 5 nombres entre los que se encuentra el nombre pasado por parámetro. Devuelve una lista con cuatro
# nombres aleatorios y el escogido por el usuario.
# @params: name
#
def get_npc_options(name):
    options = []

    npc_names = get_npc_names()

    while len(options) < 5:
        name_to_append = random.choice(npc_names)
        if name_to_append not in options:
            options.append(name_to_append)

    if name["name"] not in options:
        options[random.randint(0, len(options) - 1)] = name["name"]

    return options
    

    