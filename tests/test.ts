import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

// import * as chai from 'chai';
// import chaiHttp = require('chai-http');
// chai.use(chaiHttp);

import 'mocha';

const expect = chai.expect;

// const chai = require('chai');
const should = chai.should();
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);

const server = 'localhost:3000';

const apiRoot = '/api/v1';
describe('routes : ', () => {
   //    beforeEach(() => {});

   //    afterEach(() => {});

   describe('GET /api/v1/', () => {
      it('should ', (done) => {
         chai
            .request(server)
            .get(apiRoot + '/')
            .end((err, res) => {
               should.not.exist(err);
               res.status.should.equal(200);
               res.type.should.equal('application/json');
               res.body.status.should.eql('success');
               expect(res.body.data.msg).not.to.be.undefined;
               expect(res.body.data.msg).not.to.be.null;
               done();
            });
      });

      it('should ', (done) => {
         chai
            .request(server)
            .get(apiRoot + '/e')
            .end((err, res) => {
               should.not.exist(err);
               res.status.should.equal(404);
               res.type.should.equal('application/json');
               res.body.status.should.eql('error');
               res.body.message.should.eql(`unknown url ${apiRoot}/e`);
               done();
            });
      });

      it('should ', (done) => {
         chai
            .request(server)
            .get(apiRoot + '/ex')
            .end((err, res) => {
               should.not.exist(err);
               res.status.should.equal(404);
               res.type.should.equal('application/json');
               res.body.status.should.eql('error');
               res.body.message.should.eql(`exception to manage`);
               done();
            });
      });
   });
});
