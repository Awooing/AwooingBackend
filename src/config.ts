const database =
  'mongodb+srv://vottus:EgyeSWflVB5Vk0SL@uwucluster-mtxvo.mongodb.net/awooing' +
  (process.env.NODE_ENV === 'production' ? '_prod' : '_dev')

const port = 8000
const jwtSecret = 'vriqDOm%&qbpqWgWCfy2cLF0c1oSF6$b'
const botToken = 'NzAyMzIwNzkxODQwMjI3NDA4.Xp-VRA.N_5jRfOspQVuVZBV5vp9h8pzITo'

const cdnAccessKey = 'O3IVUIW3PBL2JD556YHR'
const cdnSecretKey = 'maUNhIIoxOeM+Q47Xc1CZ1R9EZ5QXTd9Ol8fNbK0ZLE'
const cdnSpaceName = 'awooing'
const cdnRegion = 'fra1'

export {
  database,
  port,
  jwtSecret,
  botToken,
  cdnAccessKey,
  cdnSecretKey,
  cdnSpaceName,
  cdnRegion,
}
