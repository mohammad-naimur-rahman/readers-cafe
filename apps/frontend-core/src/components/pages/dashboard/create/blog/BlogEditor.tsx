import styles from '@/styles/blogEditor.module.scss'
import { EditorState, convertToRaw } from 'draft-js'
import { draftToMarkdown } from 'markdown-draft-js'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { IBlog, ISummary } from 'validation/types'

interface Props {
  blogContents: IBlog | ISummary
  setblogContents: Dispatch<SetStateAction<IBlog | ISummary>>
}

export default function BlogEditor({ blogContents, setblogContents }: Props) {
  const [editorState, setEditorState] = useState(null)

  useEffect(() => {
    setEditorState(EditorState.createEmpty())
  }, [])

  const onEditorStateChange = state => {
    setEditorState(state)
    const raw = draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
    setblogContents({ ...blogContents, blogContent: raw })
  }

  return (
    <div className={styles.blogEditor}>
      <Editor
        className="border"
        editorState={editorState}
        wrapperClassName="blog-wrapper"
        editorClassName="blog-editor"
        toolbarClassName="blog-toolbar"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'list',
            'textAlign',
            'link',
            'embedded',
            'image',
            'history',
          ],
          inline: {
            inDropdown: false,
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          list: {
            inDropdown: false,
            options: ['unordered', 'ordered'],
          },
        }}
      />
    </div>
  )
}
