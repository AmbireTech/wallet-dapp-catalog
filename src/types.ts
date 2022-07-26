import { NETWORKS, NetworkId} from './networks'

export enum WalletConnectionType {
    'gnosis' = 'gnosis',
    'walletconnect' = 'walletconnect'
}

// export type DappIcon =  {
//     src: string,
//     sizes: string,
//     type: | 'image/svg+xml' | 'image/x-icon' | 'image/png' // etc. TODO:
// }

export type AmbireDappManifest = {
    id: string,
    name: string,
    description: string,
    iconUrl: string,
    iconPath?: string,
    connectionType: WalletConnectionType,
    providedBy?: {
        name: string,
        url: string,
    }
    networks: NetworkId[]


}