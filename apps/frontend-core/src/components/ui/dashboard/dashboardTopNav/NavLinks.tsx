import { dashboardNavLinks } from '@/constants/dashboardNavLinks'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../accordion'
import { Button } from '../../button'
import { Separator } from '../../separator'

export default function NavLinks() {
  return (
    <div className="flex flex-col gap-2">
      {dashboardNavLinks.map(link => (
        <div>
          {link.hasChildren ? (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-normal self-start items-center">
                  <div className="flex items-center gap-4">
                    <span className="w-5 h-5">{link.icon}</span>
                    <span className="">{link.label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col">
                    {link.children.map(child => (
                      <Link href={child.href}>
                        <Button className="my-1" variant="ghost">
                          {child.label}
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
                <span className="flex items-center gap-4 hover:underline py-4">
                  <span className="w-5 h-5">{link.icon}</span>
                  <span>{link.label}</span>
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
