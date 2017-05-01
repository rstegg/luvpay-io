const Stripe = window.Stripe

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

export const validNumber = value =>
  value && !Stripe.card.validateCardNumber(value) ? 'Invalid Number' : undefined

export const validExpiry = value =>
  value && !Stripe.card.validateExpiry(value) ? 'Invalid Expiration' : undefined

export const validCVC = value =>
  value && !Stripe.card.validateCVC(value) ? 'Invalid CVC' : undefined
