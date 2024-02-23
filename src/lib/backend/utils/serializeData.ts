const serializeData = <T>(data: T): T =>
  JSON.parse(
    JSON.stringify(data, (key, value) => (value instanceof Date ? value.toISOString() : value))
  )

export default serializeData
