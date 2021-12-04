import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: "USER-PRUEBA-1", //userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(), // A unique uuid
      nombres: data.nombres, // Parsed from request body
      apellidos: data.apellidos, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});