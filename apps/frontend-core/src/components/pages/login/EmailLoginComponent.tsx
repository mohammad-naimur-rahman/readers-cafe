import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function EmailLoginComponent() {
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(loginData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setloginData({ ...loginData, [name]: value })
  }
  return (
    <form
      className="flex flex-col gap-2.5 justify-center text-center w-full sm:w-[300px] lg:w-[350px] mx-auto max-w-[350px]"
      onSubmit={handleLogin}
    >
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Enter your password"
        onChange={handleChange}
      />
      <Button variant="default" className="block w-full">
        Login
      </Button>
    </form>
  )
}
