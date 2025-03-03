import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

const allowedIPs = process.env.ALLOWED_IPS?.split(',') || []

app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress

  if (allowedIPs.includes('*')) {
    return next()
  }

  if (!allowedIPs.includes(clientIP as string)) {
    return res.status(403).json({ error: 'Unauthorized' })
  }

  next()
})

app.use(cors())

app.use('/', (req, res, next) => {
  const targetUrl = req.query.url as string

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing url parameter' })
  }

  const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0')
      },
    },
  })

  proxy(req, res, next)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Proxy working on ${PORT}`)
})
