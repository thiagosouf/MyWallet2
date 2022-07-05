import { signUp, signIn } from "./services/authServices.js";

//post /sign-up
export async function postSignUp(req, res) {
        try {
          const { name, email, password } = req.body;
      
          if (!name || !email || !password) {
            return res.sendStatus(422);
          }
 
          const user = await signUp({ name, email, password });

          if (user === null){
            return res.sendStatus(422);
          }

          res.sendStatus(201);
      
        } catch (err) {
          console.error(err);
          res.sendStatus(500);
        }
      };

//post /sign-in

export async function postSignIn(req, res) {
        try {
          const { email, password } = req.body;
      
          if (!email || !password) {
            return res.sendStatus(422);
          }
          
          const token = await signIn({ email, password });
          if (token === null){
            return res.sendStatus(422);
          }

          res.send({ token });
          
        } catch (err) {
          console.error(err);
          res.sendStatus(500);
        }
      };