import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'
import Head from 'next/head'
import MeetupDetail from '../../components/meetups/MeetupDetail'

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  )
}

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://satoshi:PYrDB4JMNxlI3eDA@cluster0.ljffkyw.mongodb.net/meetups?retryWrites=true&w=majority',
    {
      serverApi: ServerApiVersion.v1,
    }
  )
  const db = client.db()
  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()

  client.close()

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  }
}

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId

  const client = await MongoClient.connect(
    'mongodb+srv://satoshi:PYrDB4JMNxlI3eDA@cluster0.ljffkyw.mongodb.net/meetups?retryWrites=true&w=majority',
    {
      serverApi: ServerApiVersion.v1,
    }
  )
  const db = client.db()
  const meetupsCollection = db.collection('meetups')

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  })

  client.close()

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  }
}

export default MeetupDetails
