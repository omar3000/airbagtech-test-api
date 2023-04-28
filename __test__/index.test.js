const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');

require('dotenv').config();

describe('Unit tests', () => {

  const token = jwt.sign({
    email: 'ofa1995f14@deedde.com',
    userId: '63b1b8f9-6468-40ae-aae4-0ec204e23910'
  },
  process.env.JWT_KEY);

  it(`resolve expression eval`, async () => {
    const operations = [
      {"input": {"operation": '3+42*(1-2/(3+4)-1*21)+1' }, "output" : "-848"}
    ];

    for (let i = 0; i < operations.length; i++) {
      const operation = operations[i];
      const response = await request(app).post('/expression').set('Authorization', `${token}`).send(operation.input);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(operation.output);
      console.log(response)
    }
  });


  it(`returns result remove repeats`, async () => {
    const nums = [
      {"input": {"array": [5,4,2,4,6.7,88, 34]}, "output" : "5,4,2,6.7,88,34"},
      {"input": {"array": [1,3,5,66,44,333,2,1,2,5,7,7]}, "output" : "1,3,5,66,44,333,2,7"},
      {"input": {"array": [1,8,5,3,1,7,5,3,2]}, "output" : "1,8,5,3,7,2"}
    ];

    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      const response = await request(app).post('/repeat').set('Authorization', `${token}`).send(num.input);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(num.output);
      console.log(response)
    }
  });

  it(`returns result cesar`, async () => {
    const strs = [
      {"input": {"str": 'acdf', "displacement": 4 }, "output" : "EGHJ"},
      {"input": {"str": 'dfghyrs', "displacement": 3}, "output" : "GIJKBUV"},
      {"input": {"str": 'asdgh', "displacement": 7}, "output": "HZKNO"},
    ];

    for (let i = 0; i < strs.length; i++) {
      const str = strs[i];
      console.log(str)
      const response = await request(app).post('/cesar').set('Authorization', `${token}`).send(str.input);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(str.output);
      console.log(response)
    }
  });


  it(`returns result blackjack`, async () => {
    const hands = [
      {"input": {"cards": ["A", "2", "Q"]}, "output" : "13"},
      {"input": {"cards": ["Q","8"]}, "output" : "18"},
      {"input": {"cards": ["A","4"]}, "output" : "15"},
      {"input": {"cards": ["A","K"]}, "output" : "21"},
      {"input": {"cards": ["A","A","J"]}, "output" : "12"},
      {"input": {"cards": ["A","A","8"]}, "output" : "20"},
      {"input": {"cards": ["3","3","9","A","6"]}, "output" : "22"},
    ];

    for (let i = 0; i < hands.length; i++) {
      const hand = hands[i];
      console.log(hand)
      const response = await request(app).post('/blackjack').set('Authorization', `${token}`).send(hand.input);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(hand.output);
      console.log(response)
    }
  });
  
  it('returns all combinations of three distinct digits', async () => {
    const response = await request(app).get('/combinations').set('Authorization', `${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      "012,013,014,015,016,017,018,019,023,024,025,026,027,028,029,034,035,036,037,038,039,045,046," +
      "047,048,049,056,057,058,059,067,068,069,078,079,089,123,124,125,126,127,128,129,134,135,136,137,"+
      "138,139,145,146,147,148,149,156,157,158,159,167,168,169,178,179,189,234,235,236,237,238,239,245,"+
      "246,247,248,249,256,257,258,259,267,268,269,278,279,289,345,346,347,348,349,356,357,358,359,367,"+
      "368,369,378,379,389,456,457,458,459,467,468,469,478,479,489,567,568,569,578,579,589,678,679,689,789"
    );
  });

});