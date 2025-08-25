import AWS from "aws-sdk";
import serverEnv from "../config/serverEnv.config";
import PATH from 'path';
import FS from 'fs';

 class S3Utils {
    private readonly s3: AWS.S3;
    private static instance: S3Utils;

    private constructor() {
        this.s3 = this.initS3();
    }

    private initS3(): AWS.S3 {
        return new AWS.S3({
            endpoint: serverEnv.AWS_ENDPOINT,
            accessKeyId: serverEnv.AWS_ACCESS_KEY_ID,
            secretAccessKey: serverEnv.AWS_SECRET_ACCESS_KEY
        });
    }

    public uploadFile() {
        const fileContent = FS.createReadStream(PATH.resolve("/src/fils/op.js"));
        const params = {
            Bucket: serverEnv.S3_BUCKET_NAME!,
            Key: 'base-code-files',
            Body: fileContent
        };

        this.s3.putObject(params, (err, data) => {
            if (err) {
                console.error("Error uploading file: ", err);
            } else {
                console.log("File uploaded successfully: ", data);
            }
        });

    }

    public static getInstance(): S3Utils {
        if (!S3Utils.instance) {
            S3Utils.instance = new S3Utils();
        }
        return S3Utils.instance;
    }

}

export default S3Utils.getInstance();