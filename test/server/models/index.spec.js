import mocha from 'mocha';
import chai from 'chai';

import Model from '../../../server/app/Models';

import mongoose from 'mongoose';
import mongoConfig from '../../../server/config/mongo.json';

mongoose.connect(`mongodb://127.0.0.1:${mongoConfig.port}/${mongoConfig.db}`, {
  useMongoClient: true
});

const expect = chai.expect;

class Tests extends Model {
  constructor() {
    super();

    this.schema = this.createScheme('for_tests', {
      test_unique: {
        type: String,
        unique: true
      },
      test_string: {
        type: String
      }
    });
  }
}

describe('Model', () => {
  let count, id, Test;

  before(() => {
    Test = new Tests();

    Test.schema.collection.drop();
  });

  it('Create', done => {
    Test.new({
      test_unique: 'test',
      test_string: 'String'
    }, (err, test) => {
      id = test._id;

      expect(test.test_unique).to.eql('test');
      expect(test.test_string).to.eql('String');

      Test.new({
        test_unique: 'test',
        test_string: 'String'
      }, (sErr) => {
        expect(sErr.code).to.eql(11000);
        expect(sErr.errmsg.indexOf('test_unique') > 0).to.be.true;

        done();
      });
    });
  });

  it('Update', done => {
    Test.update(id, {
      test_unique: 'String'
    }, () => {
      Test.find(id, (err, test) => {
        expect(test.test_unique).to.eql('String');

        done();
      })
    });
  });

  it('Destory', done => {
    Test.all((err, tests) => {
      expect(tests.length).to.eql(1);

      Test.destroy(id);

      Test.all((err, tests) => {
        expect(tests.length).to.eql(0);

        done();
      });
    });
  });
});
