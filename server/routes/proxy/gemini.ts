// --- gemini.ts --- //
// Back end server proxy route
// Calls Google's AI API to get around potention CORS preventions, and for best practice.
// Ensures environment variables are not on the client side
// We may need to import node:path here but I'm still not really sure how/when to be using that.
// The prompt we're sending to the AI can, and should be changed to be more structured and specific to our project.

import express from 'express'
import 'dotenv/config'
import { GoogleGenAI } from '@google/genai'

const googleApiKey = process.env.GOOGLE_API_KEY
const genAI = new GoogleGenAI({ apiKey: googleApiKey })

const router = express.Router()

router.get('/', async (req, res) => {
  console.log(`SERVER LOG: HIT ENDPOINT '/' ON ROUTE 'proxy/gemini'`) // SERVER TEST LOG

  try {
    const date = req.query.date
    const input = req.query.input

    if (!googleApiKey) throw new Error('GOOGLE_API_KEY is improperly defined.')
    if (!date || !input)
      throw new Error(
        `Query parameter(s): ${!date ? 'date' : ''}${!date && !input ? ', ' : ''}${!input ? 'input' : ''} are undefined or cannot be used.`,
      )

    const initialResponse = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Generate a fake news article dated 2025-05-30, as what would have happened if ${input} on ${date}, make it outrageous and slightly humorous. Respond ONLY with plain text. DO NOT include any explanations, formatting, asterisks, or comments. the first line should always be a headline`,
    })

    if (
      !initialResponse ||
      !initialResponse.candidates ||
      !initialResponse.candidates[0] ||
      !initialResponse.candidates[0].content ||
      !initialResponse.candidates[0].content.parts ||
      !initialResponse.candidates[0].content.parts[0] ||
      !initialResponse.candidates[0].content.parts[0].text ||
      typeof initialResponse.candidates[0].content.parts[0].text !== 'string'
    ) {
      throw new Error('Unexpected data structure in API response.')
    }
    const aiMessage = initialResponse.candidates[0].content.parts[0].text

    const formattedHeading = aiMessage.split('\n')[0].replace(/\*\*/g, '')
    const formattedBody = aiMessage
      .replace(/\*\*/g, '')
      .split('\n')
      .slice(1)
      .join('\n')

    const dataObj = {
      heading: formattedHeading,
      body: formattedBody,
    }

    return res.status(200).json(dataObj)
  } catch (error) {
    if (error instanceof Error) {
      console.log(`SERVER ERROR: ${error.message}`) // SERVER TEST LOG
      return res.status(500).json({ error: error.message })
    } else {
      console.log(`SERVER ERROR: Unknown`) // SERVER TEST LOG
      return res.status(500).json({ error: 'Something went wrong.' })
    }
  }
})

export default router
