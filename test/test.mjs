import { expect } from 'chai';
import request from 'request';

describe("API Tests", function() {
    // Test for the API to fetch all cat food products
    var url = "http://localhost:3023/api/products";

    it("should return status 200 for fetching all products", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("should return an array of products", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body).to.be.an('object');
            expect(body.data).to.be.an('array');
            done();
        });
    });

    it("should contain statusCode in the response body", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body);
            expect(body).to.have.property('statusCode');
            expect(body.statusCode).to.equal(200);
            done();
        });
    });
});

// Test for adding a new product
describe("Add New Cat Food Product", function() {
    var url = "http://localhost:3023/api/products";
    var newProduct = {
        title: "Test Cat Food",
        brand: "Test Brand",
        image: "http://example.com/image.jpg",
        description: "Test Description"
    };

    it("should return status 200 when a new product is added", function(done) {
        request.post({ url: url, json: newProduct }, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("should return a success message when a new product is added", function(done) {
        request.post({ url: url, json: newProduct }, function(error, response, body) {
            expect(body).to.have.property('message');
            expect(body.message).to.equal("Product added successfully");
            done();
        });
    });
});

// Test for invalid product addition
describe("Add Invalid Cat Food Product", function() {
    var url = "http://localhost:3023/api/products";
    var invalidProduct = {
        title: "",
        brand: "",
        image: "",
        description: ""
    };

    it("should return status 500 when an invalid product is added", function(done) {
        request.post({ url: url, json: invalidProduct }, function(error, response, body) {
            expect(response.statusCode).to.equal(500);
            done();
        });
    });

    it("should return an error message when an invalid product is added", function(done) {
        request.post({ url: url, json: invalidProduct }, function(error, response, body) {
            expect(body).to.have.property('message');
            expect(body.message).to.include("Error adding product");
            done();
        });
    });
});
