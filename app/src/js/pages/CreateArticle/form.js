import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Form } from 'semantic-ui-react'

import { validate } from './validators'

import InputField from '../../elements/InputField'
import AreaField from '../../elements/AreaField'

const CheckboxField = ({ input: { value, onChange } }) =>
  <Form.Checkbox
    label='Public'
    toggle
    checked={!!value}
    onChange={(_,data) => onChange(data.checked)} />

const CreateArticleForm = ({handleSubmit, articleTypeValue, topicTypeValue}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' label='Name' placeholder='Article name' />
    <Field component={InputField} name='url' label='Url' placeholder='Url to article' />
    <Field component={AreaField} name='description' label='Description' placeholder='Article descripton' />
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
