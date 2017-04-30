export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.amount_type) {
    errors.amount_type = 'Required'
  }
  if (values.amount_type === 'fixed' && !values.amount) {
    errors.amount = 'Required'
  }
  return errors
}
