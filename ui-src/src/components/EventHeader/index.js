import React from 'react'
import style from './index.module.css'

export const EventHeader = ({
  state: { event, user, sidebarOpen, userListOpen },
  actions: { setSidebar, setUserList }
}) => (
  <header className={style.component}>
    <button onClick={e => setSidebar(!sidebarOpen)}>
      <svg>
        <use xlinkHref='index.svg#menu' />
      </svg>
    </button>
    <h1>{event.name && event.name.replace(user.id, '')}</h1>
    {event.users && (
      <div onClick={e => setUserList(!userListOpen)}>
        <span>{event.users.length}</span>
        <svg>
          <use xlinkHref='index.svg#members' />
        </svg>
      </div>
    )}
  </header>
)
