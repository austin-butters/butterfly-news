import express from 'express'
import request from 'superagent'
import 'dotenv/config'

const router = express.Router()

router.get('/', async (req, res) => {
  // console.log('hitendpoint/news')
  // const response = await request
  //   .get('https://api.nytimes.com/svc/archive/v1/2024/1.json')
  //   .query({ 'api-key': process.env.NYT_API_KEY })
  // console.log(response)
  // res.json(response.body)

  try {
    console.log('SERVER TEST LOG: HID ENDPOINT / ON ROUTE news')
    const response = await request
      .get('https://api.nytimes.com/svc/archive/v1/2025/5.json')
      .query({ 'api-key': process.env.NYT_API_KEY })
    console.log('SERVER TEST LOG. full NYT response= ', response)
    return res.json(response.body)
  } catch (error) {
    console.log('Caught an error - unknown')
    return res.json({ error: 'Unknown Error' })
  }
})

export default router
