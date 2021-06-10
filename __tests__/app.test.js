const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const TaskRouterCapability = require('twilio/lib/jwt/taskrouter/TaskRouterCapability');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', async() => {
    const expectation = {
      id: '1',
      quantityOfItems: 10,
    };

    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantityOfItems: 10 });

    expect(res.body).toEqual(expectation);
  });
  //needs to return rows in JSON for id in num???
  it('gets all orders from our db', async() => {
    const item1 = {
      id:  expect.any(String),
      quantityOfItems: 10,
    };
    const item2 = {
      id: expect.any(String),
      quantityOfItems: 15,
    };

    await request(app)
      .post('/api/v1/orders')
      .send({ quantityOfItems: 15 });
 
    
    const res = await request(app)
      .get('/api/v1/orders');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([item1, item2]));
  });
  it('gets a single item from db', async() => {
    const item1 = {
      id: '1',
      quantityOfItems: 10,
    };

    const res = await request(app)
      .get(`/api/v1/orders/${item1.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(item1);
  });
  it('updates an order', async() => {
    const item2 = {
      id: '2',
      quantityOfItems: 15,
    };

    const res = await request(app)
      .put(`/api/v1/orders/${item2.id}`)
      .send({ quantityOfItems: 1000 });
    item2.quantityOfItems = 1000;
    expect(res.status).toBe(200);
    expect(res.body).toEqual(item2);
  });
});
