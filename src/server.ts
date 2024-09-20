import { app } from './app'
import { env } from './core/env'

const PORT = env.PORT

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 HTTP Server Running!')
})
