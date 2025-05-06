import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import {logger} from 'hono/logger'

const app = new Hono()
app.use(logger())
// Serve static files from /public folder
app.use('*', serveStatic({ root: './public' }))

// Default route (optional)
app.get('/', (c) => c.text('Fallback if HTML not found'))

export default {
  port: 3000,
  fetch: app.fetch
}
