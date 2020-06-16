const { productsMock, filteredProductsMock } = require("./products");
const sinon = require("sinon");

const getAllStub = sinon.stub();
const tagQuery = { tags: { $in: ["expensive"] } };

getAllStub.whitArgs("products").resolves(productsMock);
getAllStub
  .whitArgs("products", tagQuery)
  .resolves(filteredProductsMock("expensive"));

const createStub = sinon.stub().resolves("5ee43efa833a283938b08e52");

class MongoLibMock {
  getAll(collection, query) {
    return this.getAllStub(collection, query);
  }
  create(collection, data) {
    return createStub(collection, data);
  }
}

module.export = {
  getAllStub,
  createStub,
  MongoLibMock,
};
