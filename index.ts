import { AmbireDappManifest } from './src/types'
import { getWalletGnosisDefaultList, getGnosisDefaultList } from './src/utils'

export function getWalletDappCatalog(): AmbireDappManifest[] {
    const dappCatalog = getWalletGnosisDefaultList()
        .concat(getGnosisDefaultList())

    return dappCatalog
} 