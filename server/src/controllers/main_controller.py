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

def test_get():
    return STARDEW.scan()["Items"]

def get_achievements():
    
    achievements = STARDEW.query(
        KeyConditionExpression=Key("type").eq("achievement")
    )

    return achievements["Items"]