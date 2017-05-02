export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.number) {
    errors.number = 'Required'
  }
  if (!values.expiry) {
    errors.expiry = 'Required'
  }
  if (!values.cvc) {
    errors.cvc = 'Required'
  }
  if (!values.address_zip) {
    errors.address_zip = 'Required'
  }
  if (!values.amount) {
    errors.amount = 'Required'
  }
  if (!values.note) {
    errors.note = 'Required'
  }
  return errors
}
