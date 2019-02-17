import React from 'react'
import style from './index.module.css'
import { EventHeader } from '../EventHeader'
import { UserList } from '../UserList'
import { MessageList } from '../MessageList'
import { CreateMessageForm } from '../CreateMessageForm'

const Icon = id => (
  <svg>
    <use xlinkHref={`index.svg#${id}`} />
  </svg>
)

export const EventList = ({
  state,
  events = [],
  user,
  users,
  userListOpen,
  messages,
  current,
  actions
}) => (
    <ul className={style.component}>
      {events.map(event => {
        const messageKeys = Object.keys(messages[event.id] || {})
        const latestMessage =
          messageKeys.length > 0 && messages[event.id][messageKeys.pop()]
        const firstUser = event.users.find(x => x.id !== user.id)
        let result = []
        if (event.id !== current.id) {
          result.push(<li
            key={event.id}
            disabled={event.id === current.id}
            onClick={e => actions.setEvent(event)}
          >
            {event.name.match(user.id) && firstUser ? (
              <img src={firstUser.avatarURL} alt={firstUser.id} />
            ) : (
                Icon(event.isPrivate ? 'lock' : 'public')
              )}
            <col->
              <p>{event.name.replace(user.id, '')}</p>
              <span>{latestMessage && latestMessage.text}</span>
            </col->
          </li>)
        }

        if (event.id === current.id) {
          result.push(<li key={'openHeader' + event.id} disabled>
            <button onClick={() => actions.joinEvent(event)}>Attend</button>
            <EventHeader state={state} actions={actions} />
          </li>)
          result.push(<li key={'openPanel' + event.id} disabled>
            <col->
              <MessageList
                user={user}
                users={users}
                messages={messages[event.id]}
              />
              <CreateMessageForm eventId={current ? current.id : false} actions={actions} />
            </col->
            {userListOpen && (
              <UserList
                event={event}
                current={user.id}
                users={users}
              />
            )}
          </li>)
        }
        return result
      })}
    </ul>
  )
