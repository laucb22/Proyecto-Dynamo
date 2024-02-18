from  config.database import DB
from boto3 import *
from boto3.dynamodb.conditions import Key
STARDEW = DB.Table("StardewValley")

def add_element(data):

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
    


def get_npcs():
    
    npcs = STARDEW.query(
        KeyConditionExpression=Key("type").eq("npc")
    )

    return npcs["Items"]

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
            "type":"npc",
            "name":name_achievement
        }
    )
    
    return response

def test_get():
    return STARDEW.scan()["Items"]

def get_achievements():
    
    achievements = STARDEW.query(
        KeyConditionExpression=Key("type").eq("achievement")
    )

    return achievements["Items"]

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