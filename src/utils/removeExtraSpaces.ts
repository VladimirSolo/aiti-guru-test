export const removeExtraSpaces = (value?: string): string => {
  if (!value) return ''
  const trimmedValue = value.trim().replace(/^\s{2,}/, '')
  return trimmedValue ? trimmedValue : ''
}
