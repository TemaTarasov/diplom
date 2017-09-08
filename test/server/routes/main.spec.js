import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';

chai.use(chaiHttp);

const expect = chai.expect;

describe('Routes', () => {
  it('Responds to /', done => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.eql(200);

        done();
      });
  });

  it('200 everything else', done => {
    chai.request(server)
      .get('/foo/bar')
      .end((err, res) => {
        expect(res.status).to.eql(200);

        done();
      });
  });
});
