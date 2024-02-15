# Cinnabar Forge SQLite3 Wrapper

`@cinnabar-forge/cf-sqlite3` is a lightweight wrapper around the `sqlite3` library for Node.js, designed to simplify the interaction with SQLite databases by providing a straightforward, promise-based API. It supports executing queries, handling transactions, and fetching data with minimal boilerplate, making it ideal for small to medium-sized projects.

## Features
- **Simplified API** for executing queries, including all, get, run, and exec.
- **Transaction Support** with methods to begin, commit, and rollback transactions.
- **Promise-based**: All operations return promises, allowing for use with async/await.
- **Error Handling**: Integrated error logging and promise rejection for handling operational errors.
- **Optional Callbacks**: Support for optional callback functions for all and get methods for additional processing.

## Installation

To use `@cinnabar-forge/cf-sqlite3` in your project, install it with npm command:

```bash
npm i @cinnabar-forge/cf-sqlite3
```

Then, you can include the the module in your project files.

## Usage

```javascript
import cfSqlite3 from '@cinnabar-forge/cf-sqlite3';

const dbFile = 'capybara.db';
const db = cfSqlite3(dbFile);

async function demoQuery() {
  try {
    // Start a transaction
    await db.beginTransaction();

    // Run a query
    const insertId = await db.run("INSERT INTO tableName (column1) VALUES (?)", ['value1']);
    console.log(`Inserted row with ID: ${insertId}`);

    // Fetch multiple rows
    const rows = await db.all("SELECT * FROM tableName");
    console.log(rows);

    // Fetch a single row
    const row = await db.get("SELECT * FROM tableName WHERE id = ?", [insertId]);
    console.log(row);

    // Commit the transaction
    await db.commitTransaction();
  } catch (error) {
    console.error("Database operation failed", error);
  }
}

demoQuery();
```

## API Reference

- all(query, [args], [callback]): Fetches all rows that match the query.
- get(query, [args], [callback]): Fetches the first row that matches the query.
- run(query, [args]): Executes a query and returns the lastID.
- exec(query): Executes a SQL script.
- beginTransaction(): Starts a new transaction.
- commitTransaction(): Commits the current transaction.

## License

This project is licensed under the **ISC License**, see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

### Installation for contributors

```bash
git clone git@github.com:cinnabar-forge/cf-sqlite3.git
cd cf-sqlite3
npm ci
```

## Authors

- Timur Moziev ([@TimurRin](https://github.com/TimurRin))
