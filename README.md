# Ambire Wallet dApp catalog
Catalog of dApps integrated/featured in Ambire Wallet
---


_Basic Intro Guide_

[Ambire](https://www.ambire.com/) is a next-generation open-source Web3 wallet focused on DeFi and the EVM ecosystem.

It brings to the table a number of innovative features like human-friendly transaction parsing, simplifying ERC20 approvals, hardware wallet support and much more. It’s also a smart wallet, enabling features like multiple signers, social recovery, transaction batching, gas abstractions and others.

We are happy to announce a soft launch of our plugin system **integrated and developed on the Gnosis protocol** (Safe App).


## Why should you build an Ambire Wallet plugin

We envision Ambire as the homepage of DeFi and this is why we created our plugin system. By adding your plugin to Ambire, you get the following benefits: 

- Getting in on the ground floor: the plugin system was officially launched in Q4 of 2022 so you get a chance to join our early adopters inner circle. 
- Tapping into the Ambire Wallet’s user base: we currently have +85,000 registered accounts and growing. 
- Marketing support: Our experienced marketing team will work with you to help promote the plugin and your participation in the Ambire ecosystem. 
- Development support: Our extremely competent developers will be available to assist you should you encounter a roadblock.
- Empower your users with excellent UX - they get to benefit from all of the fantastic features Ambire Wallet offers. 

Check out Ambire Wallet here: https://wallet.ambire.com

---

# How to add your dApp to Ambire Wallet dApp Catalog

## Your dApp should follow few simple rule:

### dApp structure
- It has to implement the requirement for [Gnosis Safe App](https://docs.gnosis-safe.io/build/sdks/safe-apps/get-started) (the dApp will connect Ambire Wallet automatically) or [WalletConnect](https://docs.walletconnect.com/quick-start/dapps/client) (requires user interaction for connecting to Ambire Wallet)
- Quick guide how to Make dApp with `@gnosis.pm/safe-apps-react-sdk` and transaction batching transactions batching can be found [here](/how-to-create-a-plugin.md)

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
- Currently supported network ids by Ambire Wallet are [1, 137, 43114, 56, 250, 1284, 1285, 42161, 100, 321, 10, 1088, 4, 25, 1313161554] and more in the future.

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

  - `networks` field is not mandatory but will help to auto detect the supported networks if the dApp is as custom one from the Ambire Wallet interface.

> Note: iconPath it's the public relative path where the Safe will try to load your app icon. For this example, it should be `https://dapp.someurl.com/someDappIcon.svg`.
### `CORS` and `X-Frame-Options`
- As Ambire Wallet Plugin your dApp is loaded to Ambire Wallet via an iframe
- Be sure `CORS` is enabled for all origins
- Remove `X-Frame-Options` from dApp headers if persist as this will prevent it to open in iframe

### Test yor dApp
- You can run your plugin at this address: https://wallet.ambire.com/staging/#/wallet/dapps
![image](https://user-images.githubusercontent.com/10422618/187924428-291f8147-e9a4-4b5a-8caf-0612a317e2ab.png)

- Go to 'ADD CUSTOM DAPP' and paste the link to URL field. If everything is correct with your dApp `manifest.json` all basic data should be loaded automatically
![image](https://user-images.githubusercontent.com/10422618/187926581-5b14b28c-9ec2-4008-9a22-0f6b1527b949.png)

- When added you can find the dApp in the list and test it:
![image](https://user-images.githubusercontent.com/10422618/187954712-18dc3906-a183-4305-88a2-d522a7fa1ec9.png)

### If your dApp uses `@web3-onboard`
- Using the official documentation of [@web3-onboard/gnosis](https://docs.blocknative.com/onboard/gnosis) will lead to some issues
- by default it will not be able to connect via Gnosis Safe App sdk outside the Gnosis Safe itself. To fix this add `GnosisOptions` `{ whitelistedDomains: [/./] }` to `gnosisModule`. This will enable gnosis module to work on every domain:

```
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
- `@web3-onboard` nad `@web3-onboard` does not implement the expected behavior for Gnosis Safe App - connect directly first if safe app connection is detected. Fixing this can be achieved by calling on onboard `connect({ autoSelect: 'Gnosis Safe' })`. example of this can be found here: https://github.com/AmbireTech/evm-sigtools/blob/7eb2c473de96b6428cefb027b5029d1f1b26abee/src/components/SignForm/SignForm.js#L95
