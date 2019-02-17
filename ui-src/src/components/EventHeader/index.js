import React from 'react'
import style from './index.module.css'

export const EventHeader = ({
  state: { event, user },
  actions: { joinEvent, leaveEvent }
}) => {
  const attendingCurrent = event.users ? event.users.find(x => x === user.id) : false
  return (
    <header className={style.component}>
      {attendingCurrent ?
        <div>You're Attending</div>
        : <div onClick={() => joinEvent(event)}>Attend</div>}
      <row->
        <h1>{event.name && event.name.replace(user.id, '')}</h1>
      </row->
      {event.users && (
        <div>
          <span>{event.users.length}</span>
          <svg>
            <use xlinkHref='index.svg#members' />
          </svg>
        </div>
      )}
    </header>
  )
}
