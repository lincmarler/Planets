import { planetsService } from "../services/PlanetsService.js";
import BaseController from "../utils/BaseController.js";


export class PlanetsController extends BaseController {
    constructor() {
        super('api/planets')
        this.router
            .post('', this.createPlanet)
            .get('', this.getPlanets)
            .put('/:planetId', this.editPlanet)
            .delete('/:planetId', this.removePlanet)
    }

    async createPlanet(request, response, next) {
        try {
            const body = request.body
            const newPlanet = await planetsService.createPlanet(body)
            response.send(newPlanet)
        } catch (error) {
            next(error)
        }
    }

    async removePlanet(request, response, next) {
        try {
            const message = await planetsService.removePlanet(request.params.planetId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }

    async getPlanets(request, response, next) {
        try {
            const planets = await planetsService.getPlanets(request.query)
            response.send(planets)
        } catch (error) {
            next(error)
        }
    }

    async editPlanet(request, response, next) {
        try {
            const updates = request.body
            const planetId = request.params.planetId
            const editedPlanet = await planetsService.editPlanet(planetId, updates)
            response.send(editedPlanet)
        } catch (error) {
            next(error)
        }
    }
}