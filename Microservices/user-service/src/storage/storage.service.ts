import { Injectable } from '@nestjs/common';
import StorageConfig from './storage-config';
import { DownloadResponse, Storage } from '@google-cloud/storage';

@Injectable()
export class StorageService {
  private storage: Storage;
  private readonly bucket: string;

  constructor() {
    this.storage = new Storage({
      keyFilename: '/var/secrets/google/key.json',
    });
    // this.storage = new Storage({
    //   projectId: StorageConfig.projectId,
    //   credentials: {
    //     client_email: StorageConfig.client_email,
    //     private_key: StorageConfig.private_key,
    //   },
    // });

    this.bucket = StorageConfig.mediaBucket;
  }

  async uploadFile(
    path: string,
    contentType: string,
    media: Buffer,
  ): Promise<string> {
    const file = this.storage.bucket(this.bucket).file(path);

    return new Promise((resolve, reject) => {
      const stream = file.createWriteStream();
      stream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${this.bucket}/${file.name}`;
        await file.makePublic();
        resolve(publicUrl);
      });

      stream.on('error', (err) => {
        reject(err);
      });
      stream.end(media.buffer);
    });
  }
}
