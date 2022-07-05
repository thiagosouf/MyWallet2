import connection from "./database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pFinancial, gFinancial, gSum } from "./services/financialService.js";

//post /financial-events
export async function postFinancial(req, res) {
        try {
          const authorization = req.headers.authorization || "";
          const token = authorization.replace("Bearer ", "");
      
          if (!token) {
            return res.sendStatus(401);
          }
      
          let user;
      
          try {
            user = jwt.verify(token, process.env.JWT_SECRET);
          } catch {
            return res.sendStatus(401);
          }
      
          const { value, type } = req.body;
      
          if (!value || !type) {
            return res.sendStatus(422);
          }
      
          const financialTypes = ["INCOME", "OUTCOME"];
          if (!financialTypes.includes(type)) {
            return res.sendStatus(422);
          }
      
          if (value < 0) {
            return res.sendStatus(422);
          }
      
        const financial = await pFinancial({
          userId: user.id,
          value,
          type
        });
      
          res.sendStatus(201);
        } catch (err) {
          console.error(err);
          res.sendStatus(500);
        }
      };

//get /financial-events
export async function getFinancial(req, res) {
        try {
          const authorization = req.headers.authorization || "";
          const token = authorization.replace("Bearer ", "");
      
          if (!token) {
            return res.sendStatus(401);
          }
      
          let user;
      
          try {
            user = jwt.verify(token, process.env.JWT_SECRET);
          } catch {
            return res.sendStatus(401);
          }
      
          const events = await gFinancial({ userId: user.id });
      
          res.send(events.rows);
        } catch (err) {
          console.error(err);
          res.sendStatus(500);
        }
      };

//get /financial-events/sum
export async function getSum(req, res) {
        try {
          const authorization = req.headers.authorization || "";
          const token = authorization.replace("Bearer ", "");
      
          if (!token) {
            return res.sendStatus(401);
          }
      
          let user;
      
          try {
            user = jwt.verify(token, process.env.JWT_SECRET);
          } catch {
            return res.sendStatus(401);
          }

          const sum = await gSum({ userId: user.id });
      
          res.send({ sum });
        } catch (err) {
          console.error(err);
          res.sendStatus(500);
        }
      };

