import ButtonExtended from '@/components/ui/ButtonExtended'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Facebook from '@/components/ui/icons/brandIcons/Facebook'
import Instagram from '@/components/ui/icons/brandIcons/Instagram'
import TikTok from '@/components/ui/icons/brandIcons/TikTok'
import Twitter from '@/components/ui/icons/brandIcons/Twitter'
import YouTube from '@/components/ui/icons/brandIcons/YouTube'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { DialogClose } from '@radix-ui/react-dialog'
import { FileEdit, Pen, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ISocialMediaAccounts } from 'validation/types'

interface ISocialMediaLink {
  platform: string
  link: string
  onlyIcon?: boolean
}

const SocialMediaLink = ({
  platform,
  link,
  onlyIcon = false,
}: ISocialMediaLink) => {
  const iconMap = {
    facebook: <Facebook className="w-6 h-6 text-facebook" />,
    instagram: <Instagram className="w-6 h-6 text-instagram" />,
    twitter: <Twitter className="w-6 h-6 text-twitter" />,
    youtube: <YouTube className="w-6 h-6 text-youtube" />,
    tiktok: <TikTok className="w-6 h-6 text-red-600" />,
  }

  const icon = iconMap[platform]

  if (onlyIcon) return icon

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
  const socialMediaArray =
    socialMediaAccounts &&
    Object.entries(socialMediaAccounts).map(([platform, link]) => ({
      platform,
      link,
    }))

  const [updatedAccounts, setupdatedAccounts] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    tiktok: '',
  })

  useEffect(() => {
    if (socialMediaAccounts) {
      // eslint-disable-next-line no-restricted-syntax
      for (const platform in socialMediaAccounts) {
        // eslint-disable-next-line no-prototype-builtins
        if (updatedAccounts.hasOwnProperty(platform)) {
          setupdatedAccounts(prevAccounts => ({
            ...prevAccounts,
            [platform]: socialMediaAccounts[platform],
          }))
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socialMediaAccounts])

  const handleChange = (event, platform) => {
    const { value } = event.target
    setupdatedAccounts(prevAccounts => ({
      ...prevAccounts,
      [platform]: value,
    }))
  }

  const handleSocialMediaAccounts = () => {
    updateProfile({
      payload: { socialMediaAccounts: updatedAccounts },
      id,
      token,
    })
  }

  if (isLoading) {
    return <Skeleton className="w-72 h-5 my-3" />
  }
  return (
    <div className="flex items-center py-5">
      <ul className="flex items-center">
        {socialMediaArray?.map(({ platform, link }) => (
          <li>
            {link ? <SocialMediaLink platform={platform} link={link} /> : null}
          </li>
        ))}
      </ul>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="ml-3 cursor-pointer text-primary transition-opacity pb-2"
          >
            {socialMediaArray?.filter(el => el.link).length ? (
              <Pen className="w-5 h-5" />
            ) : (
              <span className="flex items-center gap-2 font-semibold">
                Add Social Media Accounts
                <PlusCircle />
              </span>
            )}
          </button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Update social media accounts</DialogTitle>
            <DialogDescription>
              This data will be shown publically on your profile
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-5">
            {Object.keys(updatedAccounts).map(platform => (
              <div key={platform} className="flex items-center gap-3">
                <SocialMediaLink link="" platform={platform} onlyIcon />
                <Input
                  type="text"
                  name={platform}
                  placeholder={`${platform} URL`}
                  value={updatedAccounts[platform]}
                  onChange={e => handleChange(e, platform)}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose>
              <ButtonExtended
                icon={<FileEdit />}
                onClick={handleSocialMediaAccounts}
              >
                Update accounts
              </ButtonExtended>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
