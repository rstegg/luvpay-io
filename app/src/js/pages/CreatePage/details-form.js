import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Form } from 'semantic-ui-react'

import { validate } from './validators'

import InputField from '../../elements/InputField'
import AreaField from '../../elements/AreaField'
import SelectField from '../../elements/SelectField'

const options = [
  { key: 'research', value: 'research', text: 'Research' },
  { key: 'open', value: 'open', text: 'Open' }
]

const research_options = [
  { key: 'disease', value: 'disease', text: 'Disease' },
  { key: 'engineering', value: 'engineering', text: 'Engineering' },
  { key: 'other', value: 'other', text: 'Other' },
]

const CheckboxField = ({ input: { value, onChange } }) =>
  <Form.Checkbox
    label='Public'
    toggle
    checked={!!value}
    onChange={(_,data) => onChange(data.checked)} />

const PageDetailsForm = ({handleSubmit, pageTypeValue, researchTypeValue}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' label='Name' placeholder='Page name' />
    <Field component={AreaField} name='description' label='Description' placeholder='Page descripton'  />
    <Field component={SelectField} name='page_type' label='Type' placeholder='Type' options={options} />
    {pageTypeValue === 'research' && <Field component={SelectField} name='topic' label='Type of research' placeholder='Type of research' options={research_options} />}
    {researchTypeValue === 'other' && <Field component={InputField} name='topic_other' label='Field of research' placeholder='Field of research' />}
    <Field component={CheckboxField} name='is_public' />
    <Form.Button type='submit' primary>Submit</Form.Button>
  </Form>

const connectedPageDetailsForm = reduxForm({
  form: 'newPage',
  validate
})(PageDetailsForm)

const selector = formValueSelector('newPage')

const mapStateToProps = state =>
({
  pageTypeValue: selector(state, 'page_type'),
  researchTypeValue: selector(state, 'topic')
})

export default connect(mapStateToProps)(connectedPageDetailsForm)
