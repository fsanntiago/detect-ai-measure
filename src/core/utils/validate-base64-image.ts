function isBase64(str: string): boolean {
  const base64Regex =
    /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/
  return base64Regex.test(str)
}

export function isValidImageBase64(image: string): boolean {
  const mimeRegex = /^data:image\/(png|jpeg|jpg);base64,/
  if (!mimeRegex.test(image)) return false

  const base64Str = image.split(',')[1]
  return isBase64(base64Str)
}
