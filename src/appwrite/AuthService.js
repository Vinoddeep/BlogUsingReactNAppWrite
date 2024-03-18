import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  authClient = new Client();
  authAccount;

  constructor() {
    console.log(config);

    this.authClient
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.authAccount = new Account(this.authClient);
  }

  async createAccount({ name, email, password }) {
    try {
      const userAccount = await this.authAccount.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log(userAccount);
      if (userAccount) {
        return await this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      const result = await this.authAccount.createEmailSession(email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.authAccount.get();
    } catch (error) {
      console.log("error :-> ", error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.authAccount.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
