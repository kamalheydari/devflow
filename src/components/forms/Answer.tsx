'use client'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

import { useTheme } from 'next-themes'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tinymce/tinymce-react'
import { z } from 'zod'

import { createAnswer } from '@/lib/actions/answer.action'
import { AnswerSchema } from '@/lib/validations'

import { Button, Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui'

interface Props {
  questionId: string
  question: string
  authorId: string
}

const Answer: React.FC<Props> = (props) => {
  const { authorId, questionId } = props
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()

  const editorRef = useRef(null)

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: '',
    },
  })

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    try {
      await createAnswer({
        author: JSON.parse(authorId),
        content: values.answer,
        question: JSON.parse(questionId),
        path: pathname,
      })

      form.reset()

      if (editorRef.current) {
        const editor = editorRef.current as any
        editor.setContent('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-5">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">Write your answer here</h4>
      </div>
      <Form {...form}>
        <form className="mt-6 flex w-full flex-col gap-10" onSubmit={form.handleSubmit(handleCreateAnswer)}>
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    // @ts-ignore
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'codesample',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                      ],
                      toolbar:
                        'undo redo | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist' +
                        '| help',
                      content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:16px }',
                      skin: resolvedTheme === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: resolvedTheme === 'dark' ? 'dark' : 'light',
                    }}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="primary-gradient w-fit text-white" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Answer
