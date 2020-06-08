import config from '../config'
import aws, {Endpoint, S3} from 'aws-sdk'
import m3 from 'multer-s3'

const awsS3 = new S3({
    endpoint: `${config.cdnRegion}.digitaloceanspaces.com`,
    accessKeyId: config.cdnAccessKey,
    secretAccessKey: config.cdnSecretKey,
})

const cdn = m3({
    s3: awsS3,
    bucket: 'awooing',
})

export interface File {
    path: string,
    lastModified: Date,
    size: number
}

// var image = data.Contents[Math.floor(Math.random() * data.Contents.length)]

// res.send({
//     path: image.Key,
//     fileSize: image.Size,
//     createdAt: image.LastModified
// })

function getAwooImages(): Array<File> {
    const settings: S3.Types.ListObjectsV2Request = {
        Bucket: "awooing",
        Prefix: "i/"
    }
    const images: Array<File> = []
    awsS3.listObjectsV2(settings, function (err: Error, data: any) {
        for (let image of data.Contents) {
            images.push({
                path: image.Key,
                lastModified: image.LastModified,
                size: image.Size
            })
        }
    })
    console.log(images)
    return images
}

function getAwooImage(id: number): File
{
    const images = getAwooImages()
    return images[id]
}

function getRandomAwoo(): File
{
    const images = getAwooImages()
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