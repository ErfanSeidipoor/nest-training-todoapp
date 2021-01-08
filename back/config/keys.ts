console.log("process.env.PGUSER>",process.env.PGUSER);


export default ({
    pgUser: process.env.PGUSER,
    pgHost: process.env.PGHOST,
    pgDatabase: process.env.PGDATABASE,
    pgPassword: process.env.PGPASSWORD,
    pgPort: process.env.PGPORT,
})