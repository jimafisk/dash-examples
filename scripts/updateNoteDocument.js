import { client } from '../api/client.js'

const { IDENTITY_ID, DOCUMENT_ID, LABEL } = process.env

const updateNoteDocument = async () => {
  try {
    const identity = await client.platform.identities.get(IDENTITY_ID)

    const [document] = await client.platform.documents.get(
      'tutorialContract.note',
      { where: [['$id', '==', DOCUMENT_ID]] },
    )

    document.set(
      'message',
      `Hello from ${LABEL} again @ ${new Date().toUTCString()}`
    )

    await client.platform.documents.broadcast({ replace: [document] }, identity)
    console.log('\nMessage: ', document.toJSON().message)
    console.log('\nDocument updated:\n\n', document.toJSON())
  } catch (e) {
    console.error('Something went wrong:\n', e)
  } finally {
    client.disconnect()
  }
}

updateNoteDocument()
