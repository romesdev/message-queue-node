import Mail from "../lib/mail";

export default {
  key: "UserReport",
  async handle({ data }: any) {
    const { user } = data;

    console.log("User report: ", user);
  },
};
