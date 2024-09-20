import { expressRouteAdapter } from '@/infra/http/adapter/express-route-adapter'
import { Router } from 'express'
import { makeUploadImageController } from '../factories/controllers/make-upload-image-controller'
import { makeConfirmValueController } from '../factories/controllers/make-confirm-value-controller'
import { makeFetchMeasuresController } from '../factories/controllers/make-fetch-measures-controller'

export function measureRoute(router: Router) {
  router.post('/upload', expressRouteAdapter(makeUploadImageController()))
  router.patch('/confirm', expressRouteAdapter(makeConfirmValueController()))
  router.get(
    '/:customerId/list',
    expressRouteAdapter(makeFetchMeasuresController())
  )
}
