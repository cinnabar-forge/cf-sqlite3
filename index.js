import sqlite3 from "sqlite3";

const NAME = "cf-sqlite3";
const EMPTY_ARRAY = [];

export default function (databaseFile) {
  let isTransactionActive = false;
  const db = new sqlite3.Database(databaseFile, (err) => {
    if (err != null) {
      console.error(err.message);
      throw err;
    }
  });

  return {
    exec: async function (query) {
      await new Promise((resolve, reject) => {
        console.log(NAME, "exec", query);
        db.exec(query, (err) => {
          if (err != null) {
            console.error(err.message);
            reject(err);
            return;
          }
          resolve();
        });
      });
    },
    run: async function (query, args) {
      return await new Promise((resolve, reject) => {
        console.log(NAME, "run", query, args);
        db.run(query, args ?? EMPTY_ARRAY, function (err) {
          if (err != null) {
            console.error(err.message);
            reject(err);
            return;
          }
          resolve(this.lastID);
        });
      });
    },
    get: async function (query, args, callback) {
      return await new Promise((resolve, reject) => {
        console.log(NAME, "get", query, args);
        db.get(query, args ?? EMPTY_ARRAY, function (err, row) {
          if (err != null) {
            console.error(err.message);
            reject(err);
            return;
          }
          if (row == null) {
            resolve(null);
            return;
          }
          if (callback != null) {
            resolve(callback());
          } else {
            resolve(row);
          }
        });
      });
    },
    all: async function (query, args, callback) {
      return await new Promise((resolve, reject) => {
        console.log(NAME, "all", query, args);
        db.all(query, args ?? EMPTY_ARRAY, function (err, rows) {
          if (err != null) {
            console.error(err.message);
            reject(err);
            return;
          }
          if (rows == null || rows.length == 0) {
            resolve(null);
            return;
          }
          if (callback != null) {
            resolve(callback());
          } else {
            resolve(rows);
          }
        });
      });
    },
    beginTransaction: async function () {
      if (!isTransactionActive) {
        isTransactionActive = true;
        await new Promise((resolve, reject) => {
          console.log(NAME, "beginTransaction");
          db.exec("BEGIN TRANSACTION;", (err) => {
            if (err != null) {
              console.error(err.message);
              reject(err);
              return;
            }
            resolve();
          });
        });
      }
    },
    commitTransaction: async function () {
      if (isTransactionActive) {
        isTransactionActive = false;
        await new Promise((resolve, reject) => {
          console.log(NAME, "commitTransaction");
          db.exec("COMMIT TRANSACTION;", (err) => {
            if (err != null) {
              console.error(err.message);
              reject(err);
              return;
            }
            resolve();
          });
        });
      }
    },
  };
}
