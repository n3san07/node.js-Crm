import { con } from '../sqlConnect';

export function signup(req, res) {
    const sqlQuery = "INSERT INTO `users`(`createdTime`, `email`, `userName`, `password`) VALUES (CURRENT_TIME, ?, ?, MD5(?))";
    const paramArr = [req.body.email, req.body.userName.trim(), req.body.password.trim()];

    con.query(sqlQuery, paramArr, (err, result) => {
        if (err) {
            throw err;
        }

        con.query("SELECT `id`, `createdTime`,  `email`, `userName` FROM `users` WHERE `id` = ?", [result.insertId], (err, result) => {
            if (err) {
                throw err;
            }
    
            res.send(result[0]);
        });
    });
}