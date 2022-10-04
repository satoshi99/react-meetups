import Head from 'next/head'
import { MongoClient, ServerApiVersion } from 'mongodb'

import MeetupList from '../components/meetups/MeetupList'

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  )
}

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://satoshi:PYrDB4JMNxlI3eDA@cluster0.ljffkyw.mongodb.net/meetups?retryWrites=true&w=majority',
    {
      serverApi: ServerApiVersion.v1,
    }
  )
  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  }
}

export default HomePage
