import { client } from '../api/client.js'

const { IDENTITY_ID, LABEL } = process.env

const submitNoteDocument = async () => {
  try {
    const identity = await client.platform.identities.get(IDENTITY_ID)
    const noteDocument = await client.platform.documents.create(
      'tutorialContract.note',
      identity,
      { message: `Howdy from ${LABEL} @ ${new Date().toUTCString()}` },
    )
    await client.platform.documents.broadcast({
      create: [noteDocument],
      replace: [],
      delete: [],
    }, identity)
    console.log(`DOCUMENT_ID="${noteDocument.toJSON().$id}"`)
    console.log(noteDocument.toJSON())
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

submitNoteDocument()
