import config from '../../config'
import { S3 } from 'aws-sdk'
import m3 from 'multer-s3'

const awsS3 = new S3({
    endpoint: `${config.cdnRegion}.digitaloceanspaces.com`,
    accessKeyId: config.cdnAccessKey,
    secretAccessKey: config.cdnSecretKey,
})

export interface File {
    path?: string,
    lastModified?: Date,
    size?: number
}

async function getAwooImages(): Promise<Array<File>> {
    const settings: S3.Types.ListObjectsV2Request = {
        Bucket: "awooing",
        Prefix: "i/"
    }
    const images: Array<File> = []
    const result = await awsS3.listObjectsV2(settings).promise()
    if (result.Contents !== null && result.Contents !== undefined) {
        for (let image of result.Contents) {
            if (image.Key !== "i/") {
                images.push({
                    path: image.Key,
                    lastModified: image.LastModified,
                    size: image.Size
                })
            }
        }
    }
    return images
}

async function getAwooImage(id: number): Promise<File>
{
    const images = await getAwooImages()
    return images[id]
}

async function getRandomAwoo(): Promise<File>
{
    const images = await getAwooImages()
    return images[Math.floor(Math.random() * images.length)]
}

function getFileKey(file: any) {
    return file.Key
} 

function getLastModified(file: any) {
    return file.LastModified
} 

function getSize(file: any) {
    return file.Size
} 

function getDataUrl(): String
{
    return "https://cdn.awooing.moe/"
}

export default {
    getAwooImages,
    getAwooImage,
    getRandomAwoo,
    getFileKey,
    getLastModified,
    getSize,
    getDataUrl
}