from  config.database import DB
from boto3 import *
from boto3.dynamodb.conditions import Key


from boto3.dynamodb.conditions import Attr


import random
STARDEW = DB.Table("StardewValley")

def add_element(data):

    if data["type"] == "achievement":
        data["id"] = get_new_achievement_id()

    if(isinstance(data, list)):
        for element in data:
            STARDEW.put_item(
                Item = element
            )
        return "Items added"
    else:
        STARDEW.put_item(
            Item=data
        )
        return "Item added"
    

def get_npc_names():
    
    names = []

    npcs = STARDEW.query(
        KeyConditionExpression=Key("type").eq("npc")
    )["Items"]

    for npc in npcs:
        names.append(npc["name"])

    return names

def get_npcs():
    
    npcs = STARDEW.query(
        KeyConditionExpression=Key("type").eq("npc")
    )

    return npcs["Items"]

def get_filtered_npcs(filters: dict):

    print(filters)
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
        print(npcs)
    elif len(keys) == 3:
        npcs = STARDEW.query(
            KeyConditionExpression=Key("type").eq("npc"),
            FilterExpression=Attr(keys[0]).eq(values[0]) & Attr(keys[1]).eq(values[1]) & 
                Attr(keys[2]).eq(values[2])
        )["Items"]
    else:
        return get_npcs()
    return npcs

def delete_npc(name_npc):

    response = STARDEW.delete_item(
        Key={
            "type":"npc",
            "name":name_npc
        }
    )

    return response

def delete_achievement(name_achievement):

    response = STARDEW.delete_item(
        Key={
            "type":"achievement",
            "name":name_achievement
        }
    )
    
    return response

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
                print("not a parseable value")
            

    return achievements

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

def get_random_npc():
    
    npcs = STARDEW.query(
    KeyConditionExpression=Key("type").eq("npc")
    )["Items"]

    chosen_npc = random.choice(npcs)

    return chosen_npc

def get_specific_npc(name):
    print(name)
    npc = STARDEW.get_item(
        Key={
            "type": "npc",
            "name":  name
        }
    )

    return npc["Item"]

def get_new_achievement_id():
    achievements = get_achievements()

    maxId = 0
    for achievement in achievements:
        if maxId < int(achievement["id"]):
            maxId = int(achievement["id"])
    
    return maxId + 1

def get_filtered_achievements(req):
    
    filtered_achievements = []
    achievements = get_achievements()
    for achievement in achievements:
        if req["needs_pre"] == "checked" and achievement["prerequisite_achievement"] != -1:
            filtered_achievements.append(achievement)
        elif req["needs_pre"] == "unchecked" and achievement["prerequisite_achievement"] == -1:
            filtered_achievements.append(achievement)
    return filtered_achievements