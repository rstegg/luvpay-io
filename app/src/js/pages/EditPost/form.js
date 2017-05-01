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

const EditPostForm = ({handleSubmit, postTypeValue, researchTypeValue}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' type='text' label='Name' control='input' placeholder='Post name' />
    <Field component={AreaField} name='description' type='text' label='Description' control='input' placeholder='Post descripton'  />
    <Field component={SelectField} name='post_type' label='Type' placeholder='Type' options={options} />
    {postTypeValue === 'research' && <Field component={SelectField} name='research_type' label='Type of research' placeholder='Type of research' options={research_options} />}
    {researchTypeValue === 'other' && <Field component={InputField} name='research_other' label='Field of research' placeholder='Field of research' />}
    <Field component={CheckboxField} name='is_public' />
    <Form.Button type='submit' primary>Submit</Form.Button>
  </Form>

const connectedEditPostForm = reduxForm({
  form: 'editPost',
  validate
})(EditPostForm)

const selector = formValueSelector('editPost')

const mapStateToProps = state =>
({
  postTypeValue: selector(state, 'post_type'),
  researchTypeValue: selector(state, 'research_type'),
  initialValues: state.posts.current
})

export default connect(mapStateToProps)(connectedEditPostForm)
