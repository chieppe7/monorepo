/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router.post('/login', '#controllers/auth_controller.login')
  })
  .prefix('/api/auth')

router
  .group(() => {
    router.get('/', '#controllers/medicine_controller.index')

    router.post('/', '#controllers/medicine_controller.store')

    router.patch('/:id', '#controllers/medicine_controller.update')

    router.delete('/:id', '#controllers/medicine_controller.destroy')
  })
  .prefix('/api/medicines')
