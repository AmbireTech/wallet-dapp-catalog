const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const { getWalletDappCatalog } = require('./dist/index.js')

const catalogs = JSON.stringify(getWalletDappCatalog())

const fileDir = path.join(__dirname, 'build')
const filePath = path.join(fileDir, 'ambire-wallet-dapp-catalog.json')

const writeFile = async () => {
    try {
        await mkdirp(fileDir)
        await fs.writeFileSync(filePath, catalogs)
        console.log('Catalog exported!')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

writeFile()
