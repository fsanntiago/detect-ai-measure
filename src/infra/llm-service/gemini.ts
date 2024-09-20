import path from 'path'
import os from 'os'
import fs from 'fs'
import { env } from '@/core/env'
import { ImageAnalyzer } from '@/application/llm-service/Image-analyzer'

import { type GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai'

export class Gemini implements ImageAnalyzer {
  private client: GenerativeModel
  private model = 'gemini-1.5-flash'

  constructor() {
    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)
    this.client = genAI.getGenerativeModel({
      model: this.model,
    })
  }

  private getMimeTypeFromBase64(base64Str: string): string {
    const mimeTypeMap: Record<string, string> = {
      iVBORw0KGgo: 'image/png',
      '/9j/': 'image/jpeg',
      R0lGODdh: 'image/gif',
      R0lGODlh: 'image/gif',
      UklGR: 'image/webp',
    }

    if (base64Str.startsWith('data:')) {
      const base64Header = base64Str.split(',')[1]?.slice(0, 10)
      for (const [signature, mimeType] of Object.entries(mimeTypeMap)) {
        if (base64Header?.startsWith(signature)) {
          return mimeType
        }
      }
    }

    // Default MIME type if no match is found
    return 'image/png'
  }

  fileToGenerativePart(path: any, mimeType: any) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString('base64'),
        mimeType,
      },
    }
  }

  async analyze(base64Image: string): Promise<string> {
    const mimeType = this.getMimeTypeFromBase64(base64Image)

    // Remove o prefixo base64 e converte para Buffer
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    // Define um caminho para o arquivo temporário
    const tempFilePath = path.join(os.tmpdir(), `temp_image_${Date.now()}.png`)

    // Salva a imagem no diretório temporário
    fs.writeFileSync(tempFilePath, buffer)

    const file1 = this.fileToGenerativePart(tempFilePath, mimeType)

    const prompt =
      'Analyze the provided image of a water or gas meter. Extract the numeric value displayed on the meter. Return only the numeric value without any words, letters, or additional characters. Ensure that the output is a clean and precise integer or decimal number, corresponding to the reading on the meter.'

    try {
      const response = await this.client.generateContent([prompt, file1])

      return response.response.text() // Ensure response.text() returns the clean number as expected
    } catch (error) {
      console.error(error) // Use console.error for error logging
      throw new Error('Error analyzing image')
    }
  }
}
