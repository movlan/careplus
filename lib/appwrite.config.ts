import * as sdk from "node-appwrite";

export const {
  APPWRITE_PROJECT_ID: PROJECT_ID,
  APPWRITE_API_KEY_SECRET: API_KEY,
  APPWRITE_DB_ID,
  APPWRITE_DB_PATIENT_COLLECTION_ID,
  APPWRITE_DB_DOCTOR_COLLECTION_ID,
  APPWRITE_DB_APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
