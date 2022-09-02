# How to create a plugin for Ambire Wallet

### This document provide basic information how you can start with development of plugin for Ambire Wallet

First you can get a Gnosis react template and start with application Gnosis Safe App React Template.

After that maybe you will need to get the current identity address and current network for the wallet session.

```
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
...
const { safe } = useSafeAppsSDK()
const currentAddress = safe.safeAddress
const currentNetwork = safe.network
```

#### Example of how to send a transaction
```
import { useSafeAppsSDK, BaseTransaction } from '@gnosis.pm/safe-apps-react-sdk'
...
const { sdk, connected, safe } = useSafeAppsSDK();
const txs: BaseTransaction[] = [
 {
   to: '0x31415629...',
   value: '0',
   data: '0xbaddad',
 },
 //...
];
const safeTxHash: string = await sdk.txs.send({ txs });
```

#### Example of batching transactions
```
import { useSafeAppsSDK, BaseTransaction } from '@gnosis.pm/safe-apps-react-sdk'
...
const { sdk, connected, safe } = useSafeAppsSDK();
const txs1: BaseTransaction[] = [
 {
   to: '0x31415629...',
   value: '0',
   data: '0xbaddad',
 },
 //...
];
 
const txs2: BaseTransaction[] = [
 {
   to: '0x12214312...',
   value: '0',
   data: '0xabc123',
 },
 //...
];
const safeTxHash1: string = sdk.txs.send({ txs: tnx1 });
const safeTxHash2: string = await sdk.txs.send({ txs: tnx2 });
```

#### Example of gas estimation
```
import { useSafeAppsSDK, BaseTransaction } from '@gnosis.pm/safe-apps-react-sdk'
...
const { sdk, connected, safe } = useSafeAppsSDK();
const currentAddress = safe.safeAddress
const estimatedTransferGas = await sdk.eth.getEstimateGas({
   to: '0x31415629...',
   value: '0',
   data: '0xbaddad',
   from: currentAddress,
});
```

#### Useful links 
- [Safe App SDK](https://github.com/gnosis/safe-apps-sdk)
- [Safe App documentation](https://docs.gnosis-safe.io/build/sdks/safe-apps)

### Testing the application
- See at [README](/README.md#test-yor-dapp)

### Balances provider
One of the main features that maybe you will need is to get the current balances (for most ERC20/BEP20/etc. tokens) for an account for the current network. We suggest using our own balance provider named Velcro.
```
https://velcro.ambire.com/v1/protocols/${PROTOCOL}/balances?addresses[]=${IDENTITY_ADDRESS}&network=${NETWORK_NAME}
```

For **PROTOCOL** you can use “tokens” or “nft”.

For **IDENTITY_ADDRESS** you have to use current Ambire Wallet identity address. 

For **NETWORK_NAME** you have to use one of Ambire Wallet supported networks:
- ethereum
- polygon
- fantom
- binance-smart-chain
- avalanche
- moonbeam
- moonriver

---

#### Have questions? Get in touch: 
- [Ambire on Discord](https://discord.gg/nMBGJsb)
- [Chat to us on Telegram](https://t.me/AmbireOfficial)

