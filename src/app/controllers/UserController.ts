import Queue from "../lib/Queue";
import { Request, Response } from "express";

export default {
  async store(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const user = {
      name,
      email,
      password,
    };

    await Queue.add("RegistrationMail", { user });
    await Queue.add("UserReport", { user });

    return response.status(201).json(user);
  },
};
