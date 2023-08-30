import { Button } from '@/components/ui/button'
import auth from '@/lib/firebaseConfig'
import axios from 'axios'
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithPopup,
} from 'firebase/auth'
import { useState } from 'react'

export default function RoughPage() {
  const loginWithGoogle = async e => {
    e.preventDefault()
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    provider.setCustomParameters({
      admin: 'true',
    })
    try {
      const response: UserCredential = await signInWithPopup(auth, provider)
      const { user } = response
      if (user) {
        const accessToken = await user.getIdToken()
        const result = await axios.post(
          'http://localhost:5000/api/v1/auth/login',
          { email: user.email },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        console.log(result.data)
      }
    } catch (err) {
      // console.log(err.response.data)
    }
  }

  const [bookName, setbookName] = useState('')
  const [books, setbooks] = useState([])

  const searchBook = async e => {
    e.preventDefault()
    const data = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${bookName}`,
    )
    setbooks(data.data.items)
    // console.log(data.data.items)
  }

  return (
    <div>
      <form onSubmit={loginWithGoogle}>
        <button type="submit">Login with google</button>
        <Button variant="default">Button</Button>
      </form>
      <form onSubmit={searchBook}>
        <input
          type="text"
          placeholder="Book name"
          value={bookName}
          onChange={e => setbookName(e.target.value)}
        />
        <button type="submit">Search book</button>
      </form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingBlock: '20px',
        }}
      >
        {books?.map(book => (
          <div
            style={{
              border: '1px solid gredy',
              padding: '10px',
              marginBlock: '5px',
            }}
            key={book.id}
          >
            {book.volumeInfo?.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo?.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
            <h4>{book.volumeInfo.title}</h4>
            <p>{book.volumeInfo.maturityRating}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
