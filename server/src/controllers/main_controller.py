from  config.database import DB
from boto3 import *
from boto3.dynamodb.conditions import Key
STARDEW = DB.table("StardewValley")

def add_npc(new_npc):

    STARDEW.put_item(
        Item=new_npc
    )


def get_npcs():
    
    npcs = STARDEW.query(
        KeyConditionExpression=Key("type").eq("npc")
    )

    return npcs["Items"]

def delete_npc(name_npc):

    STARDEW.delete_item(
        Key={
            "type":"npc",
            "name":name_npc
        }
    )