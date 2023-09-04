import Facebook from '@/components/ui/icons/brandIcons/Facebook'
import Instagram from '@/components/ui/icons/brandIcons/Instagram'
import TikTok from '@/components/ui/icons/brandIcons/TikTok'
import Twitter from '@/components/ui/icons/brandIcons/Twitter'
import YouTube from '@/components/ui/icons/brandIcons/YouTube'
import { Skeleton } from '@/components/ui/skeleton'
import { Pen, PlusCircle } from 'lucide-react'
import { ISocialMediaAccounts } from 'validation/types'

const SocialMediaLink = ({ planform, link }) => {
  const iconMap = {
    facebook: <Facebook className="w-6 h-6 text-facebook" />,
    instagram: <Instagram className="w-6 h-6 text-instagram" />,
    twitter: <Twitter className="w-6 h-6 text-twitter" />,
    youtube: <YouTube className="w-6 h-6 text-youtube" />,
    tiktok: <TikTok className="w-6 h-6 text-red-600" />,
  }

  const icon = iconMap[planform]
  return <a href={link}>{icon}</a>
}

interface Props {
  id: string
  token: string
  isLoading: boolean
  socialMediaAccounts: ISocialMediaAccounts
  updateProfile: (payload) => void
}

export default function SocialMediaAccounts({
  id,
  token,
  isLoading,
  socialMediaAccounts,
  updateProfile,
}: Props) {
  const socialMediaArray = Object.entries(socialMediaAccounts).map(
    ([platform, link]) => ({
      platform,
      link,
    }),
  )

  const handleSocialMediaAccounts = () => {
    updateProfile({
      payload: {
        profilePicture: '',
      },
      id,
      token,
    })
  }

  if (isLoading) {
    return <Skeleton />
  }
  return (
    <div className="flex items-center">
      <ul>
        {socialMediaArray.map(({ platform, link }) => (
          <SocialMediaLink planform={platform} link={link} />
        ))}
      </ul>
      <button
        type="button"
        className="ml-3 cursor-pointer text-primary"
        onClick={handleSocialMediaAccounts}
      >
        {socialMediaArray.length ? (
          <Pen className="w-5 h-5" />
        ) : (
          <span>
            Add icons
            <PlusCircle />
          </span>
        )}
      </button>
    </div>
  )
}
