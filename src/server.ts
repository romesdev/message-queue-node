import "dotenv/config";
import express from "express";
import UserController from "./app/controllers/UserController";

const app = express();
const port = 3333;

app.use(express.json());

app.post("/users", UserController.store);

app.listen(port, () => {
  console.log(`Server is running in ${port} 🏃‍♂️`);
});
