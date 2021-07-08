export const dateReviver = (key, value): Date | unknown => {
  const isISO8601Z =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/

  if (typeof value === "string" && isISO8601Z.test(value)) {
    const temporaryDateNumber = Date.parse(value)

    if (!Number.isNaN(temporaryDateNumber)) {
      return new Date(temporaryDateNumber)
    }
  }

  return value
}
