import qs from 'qs'
import _ from 'lodash'
import { Subject } from 'rxjs'
import axios from 'axios'

import { api } from 'app/Configs/app'

import { API_CALL } from '../actions/api'

/* eslint-disable */
const sendMethod = HTTPMethod =>
  HTTPMethod === 'get'
    ? 'params'
    : 'data'

const sendArguments = (HTTPMethod, query) =>
  HTTPMethod === 'post' ||
  HTTPMethod === 'put' ||
  HTTPMethod === 'patch' ||
  HTTPMethod === 'delete'
    ? JSON.stringify(query)
    : qs.stringify(query, {
        arrayFormat: 'brackets'
      })

/*eslint-enable*/

const apiCall = (
  url = api.url,
  endpoint = '',
  method = 'GET',
  query = {},
  headers = {}
) => {
  const subject = new Subject()
  const HTTPMethod = method.toLowerCase()
  // request[HTTPMethod](url + endpoint)
  //   [sendMethod(HTTPMethod)](sendArguments(HTTPMethod, query))
  //   .set(headers)
  //   .withCredentials()
  //   .end((error, data) => {
  //     if (_.isEmpty(data) || data.body === null) {
  //       _.merge(data, {
  //         body: {
  //           data: []
  //         }
  //       })
  //     }

  //     if (error) {
  //       subject.error({
  //         data,
  //         error
  //       })
  //     } else {
  //       subject.next({
  //         rawData: data,
  //         method: HTTPMethod
  //       })
  //       subject.complete()
  //     }
  //   })
  console.log('coords', query)
  axios({
    url: `${url}${endpoint}`,
    method: HTTPMethod,
    [sendMethod(HTTPMethod)]: query,
    headers,
    withCredentials: true
  })
    .then(payload => {
      if (payload.status >= 400) {
        subject.error(payload.data)
      } else {
        subject.next(payload.data)
      }

      subject.complete()
    })
    .catch(payload => {
      subject.error(payload.data)
      subject.complete()
    })

  return subject
}

const nextAction = (action, data) => {
  const next = _.merge({}, action, data)
  delete next[API_CALL]
  return next
}

export default store => next => action => {
  if (action.type !== API_CALL || !action.fields) return next(action)
  const { url, endpoint, headers, method, query, types, metadata } = action.fields
  
  next({
    type: types.REQUEST,
    metadata
  })
  
  // next({
  //   type: types.REQUEST,
  //   query: action.fields.query,
  // })
  // next({
  //   type: types.SUCCESS,
  //   payload: { data: {}}
  // })

  const subject = new Subject()
  const apiRequest = apiCall(url, endpoint, method, query)

  const onError = payload => {
    console.log('error occured', payload)
    const data = {
      payload,
      type: types.FAILURE,
      metadata,
      error: true
    }

    next(data)

    subject.error()
  }

  const onSuccess = successData => {
    let payload = {
      data: successData
    }

    const data = {
      payload,
      type: types.SUCCESS,
      metadata
    }

    next(data)

    subject.next(payload)
    subject.complete()
  }

  apiRequest.subscribe(onSuccess, onError)

  return subject
}
