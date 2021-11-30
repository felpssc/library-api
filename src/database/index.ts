import { createConnection, Connection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test'
        ? 'library_test'
        : defaultOptions.database,
    }),
  );
};
