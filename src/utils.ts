import gnosisDefaultList from './gnosis-default.applist.json'
import walletGnosisDefaultCatalog from './ambire-wallet-gnosis-default.applist.json'
import { AmbireDappManifest, WalletConnectionType } from './types'
import networks, { NetworkId } from './networks'

export const chainIdToWalletNetworkId = (chainId: number): NetworkId | null => {
    return networks.find(n => n.chainId === chainId)?.id || null
}

export function getGnosisDefaultList(): AmbireDappManifest[] {
    const asWalletDapps = gnosisDefaultList.apps.map(dapp => {
        const walletDapp = {
            ...dapp,
            connectionType: WalletConnectionType.gnosis,
            networks: dapp.networks.map(n => chainIdToWalletNetworkId(n)).filter(n => !!n) as NetworkId[]
        }

        return walletDapp
    })

    return asWalletDapps
}

export function getWalletGnosisDefaultList(): AmbireDappManifest[] {
    const walletGnosisDapps: AmbireDappManifest[] = walletGnosisDefaultCatalog.apps
        .map(d => ({
            ...d,
            connectionType: WalletConnectionType.gnosis,
            networks: d.networks as NetworkId[]
        }))

    return walletGnosisDapps
} 