export const splitMarkdown = (content: string, maxLength) => {
  const truncatedContent = content.slice(0, maxLength)

  const lastBlockIndex = truncatedContent.lastIndexOf('\n\n')
  const splittedSummary =
    lastBlockIndex >= 0
      ? truncatedContent.slice(0, lastBlockIndex)
      : truncatedContent
  return `${splittedSummary} ...`
}
