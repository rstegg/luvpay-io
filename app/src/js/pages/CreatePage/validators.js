export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.page_type) {
    errors.page_type = 'Required'
  }
  if (values.page_type === 'other' && !values.research_type) {
    errors.research_type = 'Required'
  }
  if (values.research_type === 'research' && !values.research_other) {
    errors.research_other = 'Required'
  }
  return errors
}
