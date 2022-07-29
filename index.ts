import { AmbireDappManifest } from './src/types'
import { getWalletGnosisDefaultList, getGnosisDefaultList, getWalletWalletconnectDefaultList } from './src/utils'

function getWalletDappCatalog(): AmbireDappManifest[] {
    const dappCatalog = getWalletGnosisDefaultList()
        .concat(getGnosisDefaultList())
        .concat(getWalletWalletconnectDefaultList())

    return dappCatalog
}

export * from './src/types'
export * from './src/utils'
export * from './src/networks'

export default  getWalletDappCatalog