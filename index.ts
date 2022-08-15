const gnosisDefaultList = require('./catalogs/gnosis-default.applist.json')
const walletGnosisDefaultCatalog = require('./catalogs/ambire-wallet-gnosis-default.applist.json')
const walletWalletconnectDefaultCatalog = require('./catalogs/ambire-wallet-walletconnect-default.applist.json')
import { NetworkId } from 'ambire-common/src/constants/networks'
import { AmbireDappManifest, WalletConnectionType, chainIdToWalletNetworkId } from 'ambire-common/src/services/dappCatalog'

function getGnosisDefaultList(): Array<AmbireDappManifest> {
    const asWalletDapps = gnosisDefaultList.apps.map((dapp: any) => {
        const walletDapp = {
            ...dapp,
            connectionType: WalletConnectionType.gnosis,
            networks: dapp.networks.map((n: number) => chainIdToWalletNetworkId(n)).filter((n: any) => !!n) as NetworkId[]
        }

        return walletDapp
    })

    return asWalletDapps
}

function getWalletGnosisDefaultList(): Array<AmbireDappManifest> {
    const walletGnosisDapps: AmbireDappManifest[] = walletGnosisDefaultCatalog.apps
        .map((d: any) => ({
            ...d,
            connectionType: WalletConnectionType.gnosis,
            networks: d.networks as NetworkId[]
        }))

    return walletGnosisDapps
}

export function getWalletWalletconnectDefaultList(): Array<AmbireDappManifest> {
    const walletGnosisDapps: AmbireDappManifest[] = walletWalletconnectDefaultCatalog.apps
        .map((d: any) => ({
            ...d,
            connectionType: WalletConnectionType.walletconnect,
            networks: d.networks as NetworkId[]
        }))

    return walletGnosisDapps
}

function getWalletDappCatalog(): Array<AmbireDappManifest> {
    const dappCatalog = getWalletGnosisDefaultList()
        .concat(getGnosisDefaultList())
        .concat(getWalletWalletconnectDefaultList())

    return dappCatalog
}

module.exports = {
    getWalletDappCatalog
}