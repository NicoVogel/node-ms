const dbCollection = 'node-ms-account';
const dbUser = 'account';
const dbPassword = 'account';

export const dbUrl: string = `mongodb://${dbUser}:${dbPassword}@mongodb:27017/${dbCollection}`;
