import Dash from "dash"

const { NETWORK, MNEMONIC, CONTRACT_ID } = process.env

export const client = new Dash.Client({
  network: NETWORK,
  wallet: {
    mnemonic: MNEMONIC,
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 990000,
    },
  },
  apps: {
    tutorialContract: {
      contractId: CONTRACT_ID,
    },
  },
})
