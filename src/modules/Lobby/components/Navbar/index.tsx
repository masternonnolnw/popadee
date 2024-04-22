'use client'

import Typography from '@/common/components/base/Typography'
import Avatar from '@/common/components/chat-chat/avatar/medium'
import requireRegister from '@/common/stores/user/hooks/requireRegister'
import userStore from '@/common/stores/user/user-store'

const Navbar = () => {
  requireRegister()

  const user = userStore((state) => state.user)

  return (
    <div className="flex flex-row w-full h-[100px] items-center px-6 sticky top-0 z-[100]">
      <Avatar avatarUrl={user.userAvatar} />

      <div className="flex flex-row gap-2 w-full">
        <Typography variant="h4" className="ml-4 text-white">
          {user.username}
        </Typography>
        <Typography variant="h1" className="text-white !text-[60px] absolute left-1/2 top-5 transform -translate-x-1/2">
          Popadee
        </Typography>
      </div>
    </div>
  )
}

export default Navbar
