import { Router } from 'express'
import { activityRoutes } from '../modules/activity/activity.routes'
import { authRoutes } from '../modules/auth/auth.routes'
import { authorRoutes } from '../modules/author/author.routes'
import { blogRoutes } from '../modules/blog/blog.routes'
import { bookRoutes } from '../modules/book/book.routes'
import { commentRoutes } from '../modules/comment/comment.routes'
import { discussionRoutes } from '../modules/discussion/discussion.routes'
import { donationRoutes } from '../modules/donation/donation.routes'
import { genreRoutes } from '../modules/genre/genre.routes'
import { readingListRoutes } from '../modules/readingList/readingList.routes'
import { reviewRoutes } from '../modules/review/review.routes'
import { shortContentRoutes } from '../modules/shortContent/shortContent.routes'
import { summaryRoutes } from '../modules/summary/summary.routes'
import { userRoutes } from '../modules/user/user.routes'

const router = Router()

const allRoutes = [
  { path: '/user', routes: userRoutes },
  { path: '/activity', routes: activityRoutes },
  { path: '/author', routes: authorRoutes },
  { path: '/blog', routes: blogRoutes },
  { path: '/book', routes: bookRoutes },
  { path: '/comment', routes: commentRoutes },
  { path: '/discussion', routes: discussionRoutes },
  { path: '/donation', routes: donationRoutes },
  { path: '/genre', routes: genreRoutes },
  { path: '/readingList', routes: readingListRoutes },
  { path: '/review', routes: reviewRoutes },
  { path: '/short-content', routes: shortContentRoutes },
  { path: '/summary', routes: summaryRoutes },
  { path: '/auth', routes: authRoutes },
]

allRoutes.forEach(({ path, routes }) => router.use(path, routes))

export default router
