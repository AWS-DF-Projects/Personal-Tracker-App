import json
import boto3
from decimal import Decimal
from boto3.dynamodb.types import TypeDeserializer

# Helper function to convert Decimal to float
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

client = boto3.client('dynamodb')
table_name = 'PersonalTrackerDB'

def lambda_handler(event, context):
    try:

        keys_to_get = [
            {'PK': {'S':'User#Darren_Fawcett'},'SK': {'S':'PROFILE'}},
            {'PK': {'S':'User#Darren_Fawcett'},'SK': {'S':'GOALS'}},
            {'PK': {'S':'User#Darren_Fawcett'},'SK': {'S':'DATA_UI'}}
        ]
        response = client.batch_get_item(
            RequestItems={
                table_name: {
                    'Keys': keys_to_get
                }
            }
        )

        items = response['Responses'].get(table_name, [])

        deserializer = TypeDeserializer()
        parsed_items = [{k: deserializer.deserialize(v) for k, v in item.items()} for item in items]

        return {
            'statusCode': 200,
            'body': json.dumps(parsed_items, default=decimal_default)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

