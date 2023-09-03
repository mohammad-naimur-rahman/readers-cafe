import { dashboardNavLinks } from '@/constants/dashboardNavLinks'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../accordion'
import { Button } from '../../button'
import { Separator } from '../../separator'

export default function NavLinks() {
  const { pathname } = useRouter()
  console.log(pathname)
  return (
    <div className="flex flex-col gap-2">
      {dashboardNavLinks.map(link => (
        <div>
          {link.hasChildren ? (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={link.label}>
                <AccordionTrigger className="font-normal self-start items-center">
                  <div className="flex items-center gap-4">
                    <span className="w-5 h-5">{link.icon}</span>
                    <span className="font-semibold">{link.label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col">
                    {link.children.map(child => (
                      <Link href={child.href}>
                        <Button
                          className="my-1 text-secondary-foreground text-[15px] opacity-75"
                          variant="link"
                        >
                          <div className="flex items-center gap-4">
                            <span className="w-5 h-5">{child.icon}</span>
                            {child.label}
                          </div>
                        </Button>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <>
              <Link href={link.href}>
                <span
                  className={clsx(
                    'flex items-center gap-4 hover:underline py-4',
                    {
                      'text-primary': pathname === link.href,
                    },
                  )}
                >
                  <span className="w-5 h-5">{link.icon}</span>
                  <span className="font-semibold">{link.label}</span>
                </span>
              </Link>
              <Separator />
            </>
          )}
        </div>
      ))}
    </div>
  )
}
