import React from 'react'
import css from './Header.module.css';

export const Header = ({ title, total }) => {
  return (
    <header className={css.header}>
      <span className={css.title}>{title}</span>
      <span className={css.total}>{total}</span>
    </header>
  )
}
