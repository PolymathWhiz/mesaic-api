# mesaic-api

API for the Mesaic test app

# Project setup

## Installing the dependencies

`npm install`

## Setting up the database

1. Copy the contents of the `db.dumpfile` in the root directory and paste in a file named `mesaic.sql`

2. Open a MySQL workbench like [MAMP](https://www.mamp.info/en/)

3. Create a database table with the name `mesaic_development`

4. Click on `import` on the top

5. Click on `choose file` and select the `mesaic.sql` file we created

6. Click on `go`

# Running server

`npm start`

The server should start on port `8080` as that is the port the frontend app will be sending the requests to.
