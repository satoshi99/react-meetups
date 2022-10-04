import { MongoClient, ServerApiVersion } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body

    const client = await MongoClient.connect(
      'mongodb+srv://satoshi:PYrDB4JMNxlI3eDA@cluster0.ljffkyw.mongodb.net/meetups?retryWrites=true&w=majority',
      {
        serverApi: ServerApiVersion.v1,
      }
    )
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const result = await meetupsCollection.insertOne(data)

    console.log(result)

    client.close()

    res.status(201).json({ message: 'Meetup inserted' })
  }
}

export default handler
