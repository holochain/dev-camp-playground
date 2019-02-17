import React from 'react'
import Icons from '../../index.svg'
import style from './index.module.css'
import { EventHeader } from '../EventHeader'
import { UserList } from '../UserList'
import { MessageList } from '../MessageList'
import { CreateMessageForm } from '../CreateMessageForm'

const Icon = id => (
  <svg>
    <use xlinkHref={`${Icons}#${id}`} />
  </svg>
)

export const EventList = ({
  state,
  events = [],
  user,
  users,
  messages,
  current,
  actions
}) => (
    <ul className={style.component}>
      {events.map(event => {
        const attendingCurrent = current.users ? current.users.find(x => x === user.id) : false

        let renderResult = []

        // a little preview of the event
        // click to expand
        if (event.id !== current.id) {
          renderResult.push(<li
            key={event.id}
            disabled={event.id === current.id}
            onClick={e => actions.setEvent(event)}
          >
            {Icon(event.isPrivate ? 'lock' : 'public')}
            <col->
              <p>{event.name.replace(user.id, '')}</p>
              <span>{event.description}</span>
            </col->
          </li>)
        }

        // the expanded view of the selected event
        if (event.id === current.id) {
          renderResult.push(<li key={'openHeader' + event.id} className={style.openEvent}>
            <EventHeader state={state} actions={actions} />
          </li>)
          renderResult.push(<li key={'openPanel' + event.id} className={style.openEvent}>
            <col->
              <h3>Description</h3>
              <h5>{event.description}</h5>
              {attendingCurrent && <MessageList
                user={user}
                users={users}
                messages={messages[event.id]}
              />}
              {attendingCurrent &&
                <CreateMessageForm eventId={current ? current.id : false} actions={actions} />}
            </col->
            <col->
              <UserList
                event={current}
                current={user.id}
                users={users}
              />
            </col->
          </li>)
        }
        return renderResult
      })}
    </ul>
  )
