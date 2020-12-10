import { cdnAccessKey, cdnRegion, cdnSecretKey } from '../config'
import { S3 } from 'aws-sdk'

export class CdnFetcher {
  s3 = new S3({
    endpoint: `${cdnRegion}.digitaloceanspaces.com`,
    accessKeyId: cdnAccessKey,
    secretAccessKey: cdnSecretKey,
  })

  static cdnUrl = 'https://cdn.awooing.moe/'

  awooImages = async () => {
    const settings: S3.ListObjectsV2Request = {
      Bucket: 'awooing',
      Prefix: 'i/',
    }
    const results = await this.s3.listObjectsV2(settings).promise()
    return results.Contents ? CdnFile.fromObjects(results.Contents) : []
  }

  async randomAwoo(): Promise<CdnFile> {
    const images = await this.awooImages()
    return images[Math.floor(Math.random() * images.length)]
  }
}

export class CdnFile {
  public path: string
  public lastModified: Date
  public size: number

  constructor(file: S3.Object) {
    this.path = file.Key!
    this.lastModified = new Date(file.LastModified!)
    this.size = file.Size!
  }

  static fromObjects(results: S3.ObjectList) {
    const files = []
    for (const result of results) {
      files.push(CdnFile.fromObject(result))
    }
    return files
  }

  static fromObject(result: S3.Object) {
    return new this(result)
  }

  getPath() {
    return this.path
  }

  getLastModified() {
    return this.lastModified
  }

  getSize() {
    return this.size
  }
}
