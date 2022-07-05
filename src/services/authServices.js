import connection from "./database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signUp({name, email, password}){
    const existingUsers = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
      ); 
      if (existingUsers.rowCount > 0) {
        return null;
      }
      const hashedPassword = bcrypt.hashSync(password, 12);
      return await connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
      );
}

async function signIn({email, password}){
    const { rows } = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
      );
      const [user] = rows;
  
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.sendStatus(401);
      }
  
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET
      );
  
        return token;
}

export {signUp, signIn};