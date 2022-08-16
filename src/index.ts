const gnosisDefaultList = require('./catalogs/gnosis-default.applist.json')
const walletGnosisDefaultCatalog = require('./catalogs/ambire-wallet-gnosis-default.applist.json')
const walletWalletconnectDefaultCatalog = require('./catalogs/ambire-wallet-walletconnect-default.applist.json')
import { NetworkId } from 'ambire-common/src/constants/networks'
import { AmbireDappManifest, WalletConnectionType } from 'ambire-common/src/services/dappCatalog/types'
import { chainIdToWalletNetworkId } from 'ambire-common/src/services/dappCatalog/dappCatalogUtils'
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

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
    const walletGnosisDapps: Array<AmbireDappManifest> = walletGnosisDefaultCatalog.apps
        .map((d: any) => ({
            ...d,
            connectionType: WalletConnectionType.gnosis,
            networks: d.networks as NetworkId[]
        }))

    return walletGnosisDapps
}

export function getWalletWalletconnectDefaultList(): Array<AmbireDappManifest> {
    const walletGnosisDapps: Array<AmbireDappManifest> = walletWalletconnectDefaultCatalog.apps
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

const catalogs = JSON.stringify(getWalletDappCatalog())

const fileDir = path.join( __dirname, '../', 'build')
const filePath = path.join(fileDir, 'ambire-wallet-dapp-catalog.json')

const writeFile = async () => {
    try {
        await mkdirp(fileDir)
        await fs.writeFileSync(filePath, catalogs)
        console.log('Catalog exported!')
        process.exit(0)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

writeFile()
