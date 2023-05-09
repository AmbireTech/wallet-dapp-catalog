const {getWalletDappCatalog} = require('./combineDapps')

const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')


const buildAndSave = async () =>{
    const catalogs = JSON.stringify(getWalletDappCatalog())

    const fileDir = path.join(__dirname, '../', 'build')
    const filePath = path.join(fileDir, 'ambire-wallet-dapp-catalog.json')
    
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

buildAndSave()