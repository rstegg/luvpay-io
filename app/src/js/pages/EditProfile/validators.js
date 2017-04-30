export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.username) {
    errors.name = 'Required'
  }
  return errors
}
