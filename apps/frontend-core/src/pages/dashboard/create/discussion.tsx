import animationData from '@/assets/lottie/savingFile.json'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ButtonExtended from '@/components/ui/ButtonExtended'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Overlay from '@/components/ui/overlay'
import { Textarea } from '@/components/ui/textarea'
import { useCreateDiscussionMutation } from '@/redux/features/discussion/discussionApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { zodResolver } from '@hookform/resolvers/zod'
import { FilePlus2 } from 'lucide-react'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { DiscussionValidation } from 'validation/zod/ZDiscussion'
import { z } from 'zod'

export default function CreateiscussionPage() {
  const { token } = getIdAndToken()

  const [createDiscussion, { isLoading, isError, error, isSuccess }] =
    useCreateDiscussionMutation()

  const schema = DiscussionValidation.CreateDiscussionZodSchema
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    createDiscussion({ payload: values, token })
  }

  useEffect(() => {
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) toast.success('Discussion created successfully!')
    if (isLoading) toast.success('Discussion creating!')
  }, [isSuccess, isError, isLoading, error])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2.5 justify-center mx-auto max-w-4xl"
      >
        <h2 className="text-3xl pt-3">Create Discussion</h2>
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Topic"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your topic description"
                  {...field}
                  disabled={isLoading}
                  className="h-[300px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <ButtonExtended type="submit" icon={<FilePlus2 />}>
            Create Discussion
          </ButtonExtended>
        </div>
      </form>
      <Overlay animationData={animationData} isOpen={isLoading} />
    </Form>
  )
}

CreateiscussionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Create Discussion | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
