export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.url) {
    errors.url = 'Required'
  }
  return errors
}
