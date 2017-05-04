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

const CreateArticleForm = ({handleSubmit, articleTypeValue, topicTypeValue}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' label='Name' placeholder='Article name' />
    <Field component={AreaField} name='description' label='Description' placeholder='Article descripton'  />
    <Field component={SelectField} name='article_type' label='Type' placeholder='Type' options={options} />
    {articleTypeValue === 'topic' && <Field component={SelectField} name='topic' label='Topic' placeholder='Topic' options={topic_options} />}
    {topicTypeValue === 'other' && <Field component={InputField} name='topic_other' label='Topic name' placeholder='Topic name' />}
    <Field component={CheckboxField} name='is_public' />
    <Form.Button type='submit' primary disabled>Submit</Form.Button>
  </Form>

const connectedCreateArticleForm = reduxForm({
  form: 'newArticle',
  validate
})(CreateArticleForm)

const selector = formValueSelector('newArticle')

const mapStateToProps = state =>
({
  articleTypeValue: selector(state, 'article_type'),
  topicTypeValue: selector(state, 'topic')
})

export default connect(mapStateToProps)(connectedCreateArticleForm)
