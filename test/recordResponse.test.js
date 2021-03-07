const request = require('supertest')
const app = require('../server');

describe("HTTP POST API endpoint", () => {
    it("should get 500 status because of missing parameters", async done => {
        const result = await request(app)
            .post("/api/v1/records")
            .send({
                "startDate": "2016-01-26",
                "maxCount": 3000
            })
        expect(result.status).toBe(500)
        expect(result.body.code).toBe(1000)
        done()
    })
    it("should get 500 status because of wrong type of parameters", async done => {
        const result = await request(app)
            .post("/api/v1/records")
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": "2700",
                "maxCount": "3000"
            })
        expect(result.status).toBe(500)
        expect(result.body.code).toBe(1001)
        done()
    })
    it("should get 500 status because of wrong maxCount and minCount params", async done => {
        const result = await request(app)
            .post("/api/v1/records")
            .send({
                "startDate": "2016-01-26",
                "endDate": "20-02-60",
                "minCount": 5000,
                "maxCount": 3000
            })
        expect(result.status).toBe(500)
        expect(result.body.code).toBe(1005)
        done()
    })
    it("should get 500 status because of missing parameters", async done => {
        const result = await request(app)
            .post("/api/v1/records")
            .send({
                "startDate": "2016-01-26",
                "endDate": "20-02-60",
                "minCount": 2700,
                "maxCount": 3000
            })
        expect(result.status).toBe(500)
        expect(result.body.code).toBe(1002)
        done()
    })
    it("should get 200 status and return records as response", async done => {
        const result = await request(app)
            .post("/api/v1/records")
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            })
        expect(result.status).toBe(200)
        expect(result.body.code).toBe(0)
        expect(result.body.msg).toBe("Success")
        done()
    })
  })