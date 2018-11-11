import fs from "fs";
import path from "path";

class Filesystem {

  constructor() {
    if (!Filesystem.instance) {
      this.initialize();
    }
  }
  initialize() {}

  addUserWorkspace(user) {
    try {
      if (!fs.existsSync(process.env.WORKSPACE_DIR)) {
        let workspacePath = process.env.WORKSPACE_DIR.split('/');
        workspacePath.pop();
        if (!fs.existsSync(workspacePath.join('/'))) {
          fs.mkdirSync(workspacePath.join('/'));
          fs.mkdirSync(process.env.WORKSPACE_DIR);
        }
      }

      let userWorkspace = path.join(process.env.WORKSPACE_DIR, user);
      if (!fs.existsSync(userWorkspace)) {
        fs.mkdirSync(userWorkspace);
      }
    } catch (err) {
      console.log(err);
    }
  }

  createBucket(user, bucketName) {
    try {
      let bucketPath = path.join(process.env.WORKSPACE_DIR, user, bucketName);
      if (!fs.existsSync(bucketPath)) {
        fs.mkdirSync(bucketPath);
      }
    } catch (err) {
      console.log(err);
    }
  }

  renameBucket(user, bucketName, newBucketName) {
    try {
      let bucketPath = path.join(process.env.WORKSPACE_DIR, user, bucketName);
      if (fs.existsSync(bucketPath)) {
        let newBucketPath = path.join(process.env.WORKSPACE_DIR, user, newBucketName);
        fs.rename(bucketPath, newBucketPath);
      }
    } catch (err) {
      console.log(err);
    }
  }

  removeBucket(user, bucketName) {
    try {
      let bucketPath = path.join(process.env.WORKSPACE_DIR, user, bucketName);
      if (fs.existsSync(bucketPath)) {
        fs.rmdirSync(bucketPath);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // createBlob(user, bucketName, blobName) {}
  removeBlob(user, bucketName, blobName) {
        try {
            let tmpPathFile = path.join(WORKSPACE_DIR, user, bucketName, blobName);

            if (fs.existsSync(tmpPathFile)) {
                fs.unlinkSync(tmpPathFile);
            }
        } catch (err) {
            console.log(err);
        }
    }
}

const instance = new Filesystem();
Object.freeze(instance);

export default instance;
