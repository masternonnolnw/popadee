'use client'

import { useState } from 'react'

import Button from '@/common/components/base/Button'
import Input from '@/common/components/base/Input'
import Typography from '@/common/components/base/Typography'
import LargeAvatar from '@/common/components/chat-chat/avatar/large'
import { AVATARS } from '@/common/const/avatar'
import userStore from '@/common/stores/user/user-store'

const RegisterPage = () => {
  const [studentId, setStudentId] = useState('')
  const [email, setEmail] = useState('')

  const [avatar, setAvatar] = useState(AVATARS[0])

  const login = userStore((state) => state.login)

  const handleCreate = () => {
    login(studentId, avatar, email)

    window.location.href = '/'
  }

  return (
    <div className="w-[400px] h-fit flex flex-col gap-4 p-8 shadow-md mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-sm">
      <Typography variant="h3" className="flex w-fit mx-auto mb-2">
        Register
      </Typography>

      <div className="flex flex-col gap-1">
        <Typography variant="body1">Student Id</Typography>
        <Input
          placeholder="Student Id"
          type="number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Typography variant="body1">Email (optional)</Typography>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="flex flex-col gap-1">
        <Typography variant="body1">Choose your avatar</Typography>
        <div className="flex flex-row w- overflow-auto px-4 gap-2 h-[110px] items-center">
          {AVATARS.map((avatarUrl) => (
            <LargeAvatar
              avatarUrl={avatarUrl}
              key={avatarUrl}
              selected={avatar === avatarUrl}
              onClick={() => setAvatar(avatarUrl)}
            />
          ))}
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleCreate}
        disabled={!studentId || !avatar || studentId[0] != '6' || studentId.length != 10}
      >
        Create
      </Button>
    </div>
  )
}

export default RegisterPage
