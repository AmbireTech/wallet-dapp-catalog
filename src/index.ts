import gnosisDefaultList from './catalogs/gnosis-default.applist.json'
import walletGnosisDefaultCatalog from './catalogs/ambire-wallet-gnosis-default.applist.json'
import walletWalletconnectDefaultCatalog from './catalogs/ambire-wallet-walletconnect-default.applist.json'
import { NetworkId } from 'ambire-common/src/constants/networks'
import { AmbireDappManifest, WalletConnectionType, chainIdToWalletNetworkId } from 'ambire-common/src/services/dappCatalog'

import fs from 'fs'
import path from 'path'
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

const catalogs = JSON.stringify(getWalletDappCatalog())

const fileDir = path.join(__dirname, 'out')
const filePath = path.join(fileDir, 'ambire-wallet-dapp-catalog.json')

const writeFile = async () => {
    console.log('Write files')
    try {
        await mkdirp(fileDir)
        await fs.writeFileSync(filePath, catalogs)
        console.log('Catalog exported!')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

console.log('Write files korrrr')

writeFile()

module.exports = {
    getWalletDappCatalog
}