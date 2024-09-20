export interface ImageAnalyzer {
  analyze(base64Image: string): Promise<string>
}
