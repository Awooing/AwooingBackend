import { S3 } from 'aws-sdk'
import { S3Object } from 'aws-sdk/clients/rekognition'
import { Object } from 'aws-sdk/clients/s3'

import { cdnRegion, cdnAccessKey, cdnSecretKey, cdnUrl } from '../../config'

type File = {
  path: string
  lastModified: Date
  size: number
}

export class Cdn {
  s3: S3

  constructor() {
    this.s3 = new S3({
      endpoint: `${cdnRegion}.digitaloceanspaces.com`,
      accessKeyId: cdnAccessKey,
      secretAccessKey: cdnSecretKey,
    })
  }

  async getAwooImages(): Promise<File[]> {
    const result = await this.s3
      .listObjectsV2({
        Bucket: 'awooing',
        Prefix: 'i/',
      })
      .promise()

    if (!result || !result.Contents) return []

    let images = result.Contents as any

    return images.map((object: Object) => {
      return {
        path: object.Key,
        lastModified: object.LastModified,
        size: object.Size,
      } as File
    }) as File[]
  }

  async getAwooImageById(id: number): Promise<File | null> {
    const images = await this.getAwooImages()
    if (!images || images === []) return null

    return images[id]
  }

  async getRandomAwoo(): Promise<File | null> {
    const images = await this.getAwooImages()
    if (!images || images === []) return null

    return images[Math.floor(Math.random() * images.length)]
  }

  static getCdnLink(file: File) {
    return `${cdnUrl}/${file.path}`
  }
}

export default Cdn
