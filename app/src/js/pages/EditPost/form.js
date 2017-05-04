import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Form } from 'semantic-ui-react'

import { validate } from './validators'

import InputField from '../../elements/InputField'
import AreaField from '../../elements/AreaField'
import SelectField from '../../elements/SelectField'

const options = [
  { key: 'topic', value: 'topic', text: 'Topic' },
  { key: 'open', value: 'open', text: 'Open' }
]

const topic_options = [
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

const EditPostForm = ({handleSubmit, postTypeValue, topicTypeValue}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' type='text' label='Name' control='input' placeholder='Post name' />
    <Field component={AreaField} name='description' type='text' label='Description' control='input' placeholder='Post descripton'  />
    <Field component={SelectField} name='post_type' label='Type' placeholder='Type' options={options} />
    {postTypeValue === 'topic' && <Field component={SelectField} name='topic' label='Type of topic' placeholder='Type of topic' options={topic_options} />}
    {topicTypeValue === 'other' && <Field component={InputField} name='topic_other' label='Topic name' placeholder='Topic name' />}
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
  topicTypeValue: selector(state, 'topic'),
  initialValues: state.posts.current
})

export default connect(mapStateToProps)(connectedEditPostForm)
