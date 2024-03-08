import { NextApiRequest, NextApiResponse } from 'next'

export type RouterFunction<R = {}> = (
  req: NextApiRequest & R,
  res: NextApiResponse
) => Promise<any> | any

export type Middleware<R = {}> = (
  req: NextApiRequest & R,
  res: NextApiResponse,
  next?: () => void
) => Promise<any> | any

interface UseRouterData<R = {}> {
  req: NextApiRequest & R
  res: NextApiResponse
  getRoute?: {
    controller: RouterFunction<R>
    middlewares?: Array<Middleware<R>>
  }
  postRoute?: {
    controller: RouterFunction<R>
    middlewares?: Array<Middleware<R>>
  }
  putRoute?: {
    controller: RouterFunction<R>
    middlewares?: Array<Middleware<R>>
  }
  patchRoute?: {
    controller: RouterFunction<R>
    middlewares?: Array<Middleware<R>>
  }
  deleteRoute?: {
    controller: RouterFunction<R>
    middlewares?: Array<Middleware<R>>
  }
}

const useRoute = async <R = {}>(
  req: NextApiRequest & R,
  res: NextApiResponse,
  controller: RouterFunction<R>,
  middlewares?: Array<Middleware<R>>
) => {
  let queue = -1

  const next = async () => {
    if (queue === (middlewares || []).length - 1) {
      await controller(req, res)
      return
    }

    queue += 1

    middlewares && (await middlewares[queue](req, res, next))
  }

  await next()
}

export const withRouter = async <R = {}>(data: UseRouterData<R>) => {
  const { req, res, getRoute, postRoute, putRoute, patchRoute, deleteRoute } = data

  const routesMapping = {
    GET: getRoute,
    POST: postRoute,
    PUT: putRoute,
    PATCH: patchRoute,
    DELETE: deleteRoute
  }

  if (routesMapping[req.method]) {
    try {
      return await useRoute<R>(
        req,
        res,
        routesMapping[req.method].controller,
        routesMapping[req.method].middlewares
      )
    } catch (err) {
      return res.status(500).send({ message: {} })
    }
  }

  res.status(404).send('Route is not found')
}
