const request = require("supertest");

const URL = 'http://localhost:8080/api/'

describe("GET /api/student ", () => {
    const newStudent = {
        student:'dona'
    }
    const newStudent2 = {
        student:'Raja'
    }
    it("should add the new record", async () => {
        const response = await request(URL).post("student").send(newStudent);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Student created successfully');
    });
    it("should add the new record", async () => {
        const response = await request(URL).post("student").send(newStudent2);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Student created successfully');
    });
    it("should return student response", async () => {
        const response = await request(URL).get("student");
        expect(response.statusCode).toBe(200);
        console.log(response.body)
        expect(response.body.data && Array.isArray(response.body.data)).toBe(true);
    });
    it("should delete the record", async () => {
        const response = await request(URL).delete("student/1")
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Student Deleted successfully');
    });
    it("should return student response", async () => {
        const response = await request(URL).get("student");
        expect(response.statusCode).toBe(200);
        console.log(response.body)
        expect(response.body.data && Array.isArray(response.body.data)).toBe(true);
    });
});