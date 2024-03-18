import config from "../config/config";
import { Client, Account, ID, Databases, Query, Storage } from "appwrite";

class DatabaseService {
  authClient = new Client();
  databases;
  bucket;

  constructor() {
    this.authClient
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.authClient);
    this.bucket = new Storage(this.authClient);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const response = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
          userId: userId,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getPosts() {
    try {
      let response = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.equal("status", "active"), Query.orderDesc("$createdAt")]
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getPostById(postId) {
    try {
      const response = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      const response = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
          userId: userId,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deletePostById(postId) {
    try {
      const response = await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      const response = await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(), // Use the generated fileId instead of generating another one
        file
      );
      return response;
    } catch (error) {
      console.error(error); // Use console.error for logging errors
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      const promise = await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
