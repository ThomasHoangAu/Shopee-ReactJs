import { rest } from 'msw'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { access_token_1s } from './auth.msw'

const meRes = {
  message: 'Get user successfully',
  data: {
    _id: '636f935e5fdc5f037e6f68d3',
    roles: ['User'],
    email: 'd3@gmail.com',
    createdAt: '2022-11-12T12:36:46.282Z',
    updatedAt: '2022-12-02T07:57:45.069Z',
    avatar: '',
    name: 'Tung Hoang'
  }
}

const meRequest = rest.get(`${config.baseUrl}me`, (req, res, ctx) => {
  const access_token = req.headers.get('authorization')
  if (access_token === access_token_1s) {
    return res(
      ctx.status(HttpStatusCode.Unauthorized),
      ctx.json({
        message: 'Error',
        data: {
          message: 'Token expired',
          name: 'EXPIRED_TOKEN'
        }
      })
    )
  }
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(meRes))
})

const userRequests = [meRequest]

export default userRequests
