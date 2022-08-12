const request = require('request');
const {myFunction} = require('../helper');

describe('Calc', () => {
    it("should multiply 2 and 2", () => {
        expect(2*2).toBe(4);
    })
})

describe("GET messages", () => {
    it("should  return 200 OK", (done) => {
        request.get('http://localhost:3000/messages', (err, res)=>{
            expect(res.statusCode).toEqual(200);
            done();
        })
    })
    it("should  return 200 OK", (done) => {
        request.get('http://localhost:3000/messages', (err, res)=>{
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
            done();
        })
    })
})

describe("GET message from user", () => {
    it("should  return messages from user", (done) => {
        request.get(`http://localhost:3000/messages/Abhi`, (err, res)=>{
            expect(res.statusCode).toEqual(200);
            done();
        })
    })
    it("Name should be Abhi", (done) => {
        request.get(`http://localhost:3000/messages/Abhijeet`, (err, res)=>{
            expect(JSON.parse(res.body)[0].name).toEqual("Abhijeet");
            done();
        })
    })
})