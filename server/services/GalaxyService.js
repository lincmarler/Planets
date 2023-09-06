import { dbContext } from "../db/DbContext.js"

class GalaxyService {

    async getGalaxy(query) {
        const galaxy = await dbContext.Galaxy.find(query)
        return galaxy
    }

    async createGalaxy(body) {
        const newGalaxy = await dbContext.Galaxy.create(body)
        return newGalaxy
    }

    async editGalaxy(galaxyId, updates) {
        const originalGalaxy = await dbContext.Galaxy.findById(galaxyId)
        if (!originalGalaxy) throw new Error('Cannot find Galaxy')
        originalGalaxy.name = updates.name || originalGalaxy.name
        originalGalaxy.emoji = updates.emoji != undefined ? updates.emoji : originalGalaxy.emoji
        originalGalaxy.stars = updates.stars || originalGalaxy.stars

        await originalGalaxy.save()
        return originalGalaxy
    }
}
export const galaxyService = new GalaxyService