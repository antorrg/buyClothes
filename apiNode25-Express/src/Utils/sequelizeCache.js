import { Cache } from '../Configs/database.js'

class SequelizeCache {
// TTL en milisegundos

  static async getCache (key) {
    const record = await Cache.findOne({ where: { key } })

    if (!record) return null

    const now = new Date()

    if (record.expires_at && record.expires_at <= now) {
    // Expiró: lo eliminamos
      await record.destroy()
      return null
    }

    return record.value
  }

  static async setCache (key, value, minutes) {
    const ttl = minutes * 60000 || 60000

    const expires_at = new Date(Date.now() + ttl)

    await Cache.upsert({
      key,
      value,
      expires_at
    })
  }

  static async clearCache (key) {
    await Cache.destroy({ where: { key } })
  }
};

export default SequelizeCache
