'use client'
import React, { useState, useEffect } from 'react'
import classes from './index.module.scss'

const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 5)

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date()
      const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setTime({ days, hours, minutes, seconds })

      if (timeDifference === 0) {
        clearInterval(timerInterval)
      }
    }, 1000)

    return () => {
      clearInterval(timerInterval)
    }
  }, [])
  return (
    <section className={classes.promotion}>
      <div className={classes.gridContainer}>
        <div className={classes.textbox}>
          <h3 className={classes.title}>Deals of the month</h3>
          <p>get ready for shopping experience</p>
          <ul className={classes.stats}>
            <StatBox label="Days" value={time.days} />
            <StatBox label="Hours" value={time.hours} />
            <StatBox label="Minuts" value={time.minutes} />
            <StatBox label="Second" value={time.seconds} />
          </ul>
        </div>
      </div>

      <img src="media/hoodie.jpg" alt="Promotion" className={classes.gridContainer} />
    </section>
  )
}

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

export default Promotion
