import { Request, Response } from 'express'

import { HttpRequest } from '../http-request'
import { BaseController } from '../base-controller'

export const expressRouteAdapter = (controller: BaseController) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    }

    try {
      const httpResponse = await controller.execute(httpRequest)

      if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json({
          error_code: httpResponse.body.errorCode,
          error_description:
            httpResponse.body.errorDescription ||
            'An unexpected error occurred.',
        })
      }
    } catch (error) {
      console.error('Error handling request:', error)
      res.status(500).json({
        error: 'Internal server error',
      })
    }
  }
}
