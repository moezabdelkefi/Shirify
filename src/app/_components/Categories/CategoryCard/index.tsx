'use client'
import React from 'react'
import Link from 'next/link'

import { Category, Media } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.media as Media
  const isVideo = media.url.endsWith('.mp4')
  const { setCategoryFilters } = useFilter()

  return (
    <div className={classes.card}>
      <Link
        href="/products"
        className={classes.overlay}
        onClick={() => setCategoryFilters([category.id])}
      >
        <p className={classes.title}>{category.title}</p>
      </Link>
      {isVideo ? (
        <video className={classes.video} autoPlay loop muted>
          <source src={media.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className={classes.image} style={{ backgroundImage: `url(${media.url})` }}></div>
      )}
    </div>
  )
}

export default CategoryCard
