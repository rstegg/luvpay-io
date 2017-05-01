export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.post_type) {
    errors.post_type = 'Required'
  }
  if (values.post_type === 'fixed' && !values.amount) {
    errors.amount = 'Required'
  }
  return errors
}
