# Ambire Wallet dApp catalog
Catalog of dApps integrated/featured in Ambire Wallet
---


[Ambire](https://www.ambire.com/) is a Web3 wallet that makes crypto self-custody easy and secure for everyone.

It brings to the table a number of innovative features like human-friendly transaction visualization, simplifying ERC20 approvals, hardware wallet support and much more. It’s also a smart wallet (account abstraction wallet), enabling features like multiple signers, social recovery, transaction batching, gas abstraction and others.

We are happy to announce a soft launch of our dApp catalog system **integrated and developed on the Gnosis protocol**.


## Why should you place your dApp in the Ambire Wallet dApp catalog

We envision Ambire as the homepage of Web3 and this is why we created our dApp catalog system. By adding your dApp to Ambire, you get the following benefits: 

- Getting in on the ground floor: the dApp catalog system was officially launched in Q4 of 2022 so you get a chance to join our early adopters inner circle. 
- Tapping into the Ambire Wallet’s user base: we currently have 95,000+ registered accounts and growing. 
- Marketing support: Our experienced marketing team will work with you to help promote the dApp and your participation in the Ambire ecosystem. 
- Development support: Our extremely competent developers will be available to assist you should you encounter a roadblock.
- Empower your users with excellent UX - they get to benefit from all of the fantastic features Ambire Wallet offers. 

Check out Ambire Wallet here: https://wallet.ambire.com

---

# How to add your dApp to Ambire Wallet dApp Catalog

## Your dApp should follow few simple rules:

### dApp structure
- It has to implement the requirements for [Gnosis Safe App](https://docs.gnosis-safe.io/build/sdks/safe-apps/get-started) (the dApp will connect Ambire Wallet automatically) or [WalletConnect](https://docs.walletconnect.com/quick-start/dapps/client) (requires user interaction for connecting to Ambire Wallet)
   - we recommend using the Gnosis Safe App protocol via `@gnosis.pm/safe-apps-react-sdk` 
   - to implement Ambire-specific transaction batching, read [this](/how-to-create-a-plugin.md)

### PR
- Make PR to this repo with your dApp data to corresponding .json file [Gnosis Safe App](/src/catalogs/wallet-gnosis.applist.json) / [WalletConnect](/src/catalogs/wallet-walletconnect.applist.json) in the following format:

```
{
    "url": "https://dapp.someurl.com/",
    "name": "Some dApp name",
    "iconUrl": "https://some.dapp.com/icon.png",
    "description": "Some awesome dApp description",
    "networks": [
        1, 
    ],
    "providedBy": {
        "name": "Some developer",
        "url": "https://app.reflexer.finance/"
    },
}
  ```
## Extra tips:

### Networks
- Currently supported chainIds by Ambire Wallet are `[1, 137, 43114, 56, 250, 1284, 1285, 42161, 100, 321, 10, 1088, 4, 25, 1313161554]` and more in the future.

### Manifest
- Make sure your app exposes a `manifest.json` file in the root dir with this structure:
```
{
    "name": "Some dApp name",
    "description": "Some awesome dApp description",
    "iconPath": "someDappIcon.svg",
    "networks": [1, 56, 250] 
}
```

  - `networks` field is not mandatory but it will help to auto-detect the supported networks if the dApp is added as a custom dApp from the wallet UI

> Note: iconPath it's the public relative path where the Safe will try to load your app icon. For this example, it should be `https://dapp.someurl.com/someDappIcon.svg`.
### `CORS` and `X-Frame-Options`
- As Ambire Wallet Plugin your dApp is loaded to Ambire Wallet via an iframe
- Be sure `CORS` is enabled for all origins
- Remove `X-Frame-Options` from dApp headers if persist as this will prevent it to open in iframe

### Test yor dApp
- You can run your dApp at this address: https://wallet.ambire.com/staging/#/wallet/dapps
![Ambire Wallet dApp catalog](https://user-images.githubusercontent.com/83211172/217004217-fbf637cf-581e-4c34-9fcc-a6bb3e554dcc.png)

- Go to 'ADD CUSTOM DAPP' and paste the link to URL field. If everything is correct with your dApp `manifest.json` all basic data should be loaded automatically
![Ambire Wallet dApp catalog adding dApp](https://user-images.githubusercontent.com/83211172/217004256-624aee04-d66f-4dd4-a1c8-738347237d08.png)

- When added you can find the dApp in the list and test it:
![Ambire Wallet dApp catalog using dApp](https://user-images.githubusercontent.com/83211172/217004295-8094f1e8-80b0-47d2-b314-0368c56fe2a7.png)

### If your dApp uses `@web3-onboard`
Using the official documentation of [@web3-onboard/gnosis](https://docs.blocknative.com/onboard/gnosis) will lead to some issues that you need to solve:

- By default your dApp will not be able to connect via Gnosis Safe App SDK outside the Gnosis Safe itself. To fix this add `GnosisOptions` `{ whitelistedDomains: [/./] }` to `gnosisModule`. This will enable gnosis module to work on every domain:

```javascript
import Onboard from '@web3-onboard/core'
import gnosisModule from '@web3-onboard/gnosis'

const gnosis = gnosisModule({ whitelistedDomains: [/./] })

const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    gnosis
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```
- `@web3-onboard` and `@web3-onboard` do not implement the expected behavior for Gnosis Safe App, which is to connect directly first if  possible. Fixing this can be achieved by calling on onboard `connect({ autoSelect: 'Gnosis Safe' })`. An example of this can be found here: https://github.com/AmbireTech/evm-sigtools/blob/7eb2c473de96b6428cefb027b5029d1f1b26abee/src/components/SignForm/SignForm.js#L95
