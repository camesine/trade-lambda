const config = require('../lib/config/config')
const chai = require('chai')
const chai_http = require('chai-http')

chai.use(chai_http)

const URI = 'http://127.0.0.1:' + config.PORT

describe('ALL', () => {
    it('SHOULD INSERT USER', (done) => {
			chai.request(URI).post('/').send({
					User: {
						Email: 'User@email.com',
						Nombre: 'NOMBRE EJEMPLO',
						Apellido: 'APELLIDO EJEMPLO',
						Edad: 22,
						Password: '123asc'
					}
			}).end((err, res) => {
            console.log(res)
            done()
        })
    })
})
