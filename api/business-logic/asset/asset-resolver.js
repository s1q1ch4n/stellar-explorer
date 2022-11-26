const {BaseIdResolver, BatchJSONResolver} = require('../base-id-resolver'),
    db = require('../../connectors/mongodb-connector'),
    AssetDescriptor = require('../asset/asset-descriptor')

class AssetResolver extends BaseIdResolver {
    constructor() {
        super(1000)
    }

    async search(network, query) {
        const data = await db[network].collection('assets')
            .find(query)
            .project({_id: 1, name: 1})
            .toArray()
        return data.map(({_id, name}) => ({_id, value: name}))
    }

    async searchByValue(network, filter) {
        return this.search(network, {name: {$in: filter}})
    }

    async searchById(network, filter) {
        return this.search(network, {_id: {$in: filter}})
    }
}

const assetResolver = new AssetResolver()

/**
 * @param {String} network
 * @param {String|[String]} assetName
 * @return {Promise<Number|null>}
 */
async function resolveAssetId(network, assetName) {
    return await assetResolver.resolveSingleId(network, new AssetDescriptor(assetName).toFQAN())
}

/**
 * @param {String} network
 * @param {Number|[Number]} assetId
 * @return {Promise<[String]>}
 */
async function resolveAssetName(network, assetId) {
    return await assetResolver.resolveSingleValue(network, assetId)
}

class AssetJSONResolver extends BatchJSONResolver {
    constructor(network) {
        super(assetResolver, network)
    }
}

module.exports = {resolveAssetId, resolveAssetName, AssetJSONResolver}