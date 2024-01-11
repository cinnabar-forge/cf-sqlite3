declare module "@cinnabar-forge/cf-sqlite3" {
  export type Sqlite3Database = {
    exec: (query: string) => Promise<void>;
    run: (query: string, args?: Array<any>) => Promise<number>;
    get: <T, R>(
      query: string,
      args?: Array<any>,
      callback?: (value: T) => R | null
    ) => Promise<R | null>;
    all: <T, R>(
      query: string,
      args?: Array<any>,
      callback?: (value: T) => R[] | null
    ) => Promise<R[] | null>;
    beginTransaction: () => Promise<void>;
    commitTransaction: () => Promise<void>;
  };

  export default function (databaseFile: string): Sqlite3Database;
}
