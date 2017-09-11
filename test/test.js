const config = require('../lib/config/config')
const chai = require('chai')
const chai_http = require('chai-http')

chai.use(chai_http)

const URI = 'http://127.0.0.1:' + config.PORT

describe('ALL', () => {
    it('EXAMPLE', (done) => {
        chai.request(URI).post('/').end((err, res) => {
            console.log(res)
            done()
        })
    })
})
