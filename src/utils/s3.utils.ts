import AWS from "aws-sdk";
import serverEnv from "../config/serverEnv.config";
import PATH from 'path';
import FS from 'fs';
const { Upload } = require('@aws-sdk/lib-storage');


class S3Utils {
    private readonly S3: AWS.S3;
    private static instance: S3Utils;

    private constructor() {
        this.S3 = this.initS3();
    }

    private initS3(): AWS.S3 {
        return new AWS.S3({
            endpoint: serverEnv.AWS_ENDPOINT,
            accessKeyId: serverEnv.AWS_ACCESS_KEY_ID,
            secretAccessKey: serverEnv.AWS_SECRET_ACCESS_KEY
        });
    }

    public uploadFile(fileLocalPath: string, fileS3Path: string) {
        const fileContent = FS.createReadStream(fileLocalPath);
        const params = {
            Bucket: serverEnv.S3_BUCKET_NAME!,
            Key: fileS3Path, // File name you want to save as in S3
            Body: fileContent
        };

        this.S3.putObject(params, (err, data) => {
            if (err) {
                console.error("Error uploading file: ", err);
            } else {
                console.log("File uploaded successfully: ", data);
            }
        });

    }

    public async uploadFolder(localFolderPath: string, s3FolderPath: string) {
        const files = await FS.promises.readdir(localFolderPath, { withFileTypes: true});
        for (const file of files) {
            const fileLocalPath = PATH.join(localFolderPath, file.name);
            const fileS3Path = PATH.join(s3FolderPath, file.name).replace(/\\/g, "/"); 
            if (file.isFile()) {
                this.uploadFile(fileLocalPath, fileS3Path);
            }
            else if (file.isDirectory()) {
                await this.uploadFolder(PATH.join(localFolderPath, file.name), PATH.join(s3FolderPath, file.name));
            }

        }

    }

    public static getInstance(): S3Utils {
        if (!S3Utils.instance) {
            S3Utils.instance = new S3Utils();
        }
        return S3Utils.instance;
    }

}

export default S3Utils.getInstance();





