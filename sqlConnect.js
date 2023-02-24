import mysql from 'mysql';

export const con = mysql.createConnection({
    host: 'sql9.freesqldatabase.com',
    user: 'sql9600623',
    password: 'KcCiB6wupG',
    database: 'sql9600623',
});

con.connect((err) => {
    if (err) {
        throw err;
    }

    console.log('DB Connected');
});
