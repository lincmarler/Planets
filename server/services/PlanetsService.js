import { request } from "express"
import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class PlanetsService {

    async getPlanets(query) {
        const planets = await dbContext.Planets.find(query).populate('galaxy')
        return planets
    }

    async createPlanet(body) {
        const newPlanet = await dbContext.Planets.create(body)
        await newPlanet.populate('galaxy')
        return newPlanet
    }

    async removePlanet(planetId) {
        const planetToRemove = await dbContext.Planets.findById(planetId)
        if (!planetToRemove) {
            throw new BadRequest("No planet at id:" + planetId)
        }
        await planetToRemove.remove()
        return `remove the planet`
    }


    async getPlanetsById(galaxyId) {
        const planets = await dbContext.Planets.find({ galaxyId: galaxyId }).populate('galaxy')
        return planets
    }

    async editPlanet(planetId, updates) {
        const originalPlanet = await dbContext.Planets.findById(planetId)
        if (!originalPlanet) throw new Error('Cannot find Planet')
        originalPlanet.name = updates.name || originalPlanet.name
        originalPlanet.biome = updates.biome || originalPlanet.biome
        originalPlanet.galaxyId = updates.galaxyId || originalPlanet.galaxyId

        await originalPlanet.save()
        return originalPlanet
    }

}

export const planetsService = new PlanetsService