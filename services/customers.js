import { con } from "../sqlConnect";

export function getCustomers(req, res) {
  con.query(
    "SELECT * FROM `customers` WHERE `isDeleted` = ?",
    [0],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
}

export function getIsDeleted(req, res) {
  con.query(
    "SELECT * FROM `customers` WHERE `isDeleted` = ?",
    [1],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
}

export function removeCustomer(req, res) {
  con.query(
    "UPDATE `customers` SET `isDeleted` = 1 WHERE `id` = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send();
    }
  );
}
export function addCustomer(req, res) {
  con.query(
    "INSERT INTO `customers`(`FirstName`, `LastName`, `email`, `phone`, `state`, `country`, `city`, `street`, `housenumber`, `Zip`, `info`, `createdby`,`gender`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.FirstName,
      req.body.LastName,
      req.body.email,
      req.body.phone,
      req.body.state,
      req.body.country,
      req.body.city,
      req.body.street,
      req.body.housenumber,
      req.body.Zip,
      req.body.info,
      req.body.createdby,
      req.body.gender,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      con.query(
        "SELECT * FROM `customers` WHERE `id` = ?",
        [result.insertId],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          res.send(result[0]);
        }
      );
    }
  );
}
export function editCustomer(req, res) {
  con.query(
    "UPDATE `customers` SET `FirstName` = ?,`LastName` = ?,`email` = ?,`phone` = ?,`state` = ?,`country` = ?,`city` = ?,`street` = ?, `housenumber` = ?, `Zip` = ?, `info` = ?, `gender` = ? WHERE `id` = ?",
    [
      req.body.FirstName,
      req.body.LastName,
      req.body.email,
      req.body.phone,
      req.body.state,
      req.body.country,
      req.body.city,
      req.body.street,
      req.body.housenumber,
      req.body.Zip,
      req.body.info,
      req.body.gender,
      req.body.id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      res.send();
    }
  );
}
export function Restore(req, res) {
  con.query(
    "UPDATE `customers` SET  `isDeleted` = 0 WHERE `id` = ?",
    [
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send();
    }
  );
}

////// not working
export function getTask(req, res) {
  con.query(
    "SELECT * FROM `tasks` WHERE `id` = ? AND `userId` = ?",
    [req.params.id, req.session.user.id],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.length) {
        res.send(result[0]);
      } else {
        res.send();
      }
    }
  );
}

export function addTask(req, res) {
  con.query(
    "INSERT INTO `tasks`(`task`, `status`, `userId`) VALUES (?, 0, ?)",
    [req.body.task, req.session.user.id],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      con.query(
        "SELECT * FROM `tasks` WHERE `id` = ?",
        [result.insertId],
        (err, result) => {
          if (err) {
            console.log(err);
          }

          res.send(result[0]);
        }
      );
    }
  );
}

export function changeTaskStatus(req, res) {
  con.query(
    "UPDATE `tasks` SET `status` = ? WHERE `id` = ? AND `userId` = ?",
    [req.params.newStatus, req.params.taskId, req.session.user.id],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      res.send();
    }
  );
}

export function changeTaskLevel(req, res) {
  con.query(
    "UPDATE `tasks` SET `level` = ? WHERE `id` = ? AND `userId` = ?",
    [req.params.newLevel, req.params.taskId, req.session.user.id],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      res.send();
    }
  );
}

export function restoreTask(req, res) {
  con.query(
    "UPDATE `tasks` SET `isDeleted` = 0 WHERE `id` = ? AND `userId` = ?",
    [req.params.id, req.session.user.id],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      res.send();
    }
  );
}
