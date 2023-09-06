import styles from '@/styles/blogEditor.module.scss'
import { EditorState, convertToRaw } from 'draft-js'
import { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'

export default function BlogEditor() {
  const [editorState, setEditorState] = useState(null)

  useEffect(() => {
    setEditorState(EditorState.createEmpty())
  }, [])

  const onEditorStateChange = state => {
    setEditorState(state)
    const raw = convertToRaw(editorState.getCurrentContent())
    console.log(raw)
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
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: [
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'monospace',
              'superscript',
              'subscript',
            ],
          },
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['unordered', 'ordered'],
          },
        }}
      />
    </div>
  )
}
