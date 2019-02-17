import React from 'react'
import style from './index.module.css'

export const CreateEventForm = ({ submit }) => (
  <form
    className={style.component}
    onSubmit={e => {
      e.preventDefault()

      const name = e.target[0].value
      const description = e.target[1].value

      if (name.length === 0) {
        return
      }

      submit({
        name,
        description
      })
      e.target[0].value = ''
      e.target[1].value = ''
    }}
  > <label>Create A New Event</label>
    <input placeholder='Name...' className={style.eventName} />
    <input placeholder='Description...' />
    <button type='submit'>
      <svg>
        <use xlinkHref='index.svg#add' />
      </svg>
    </button>
  </form>
)
