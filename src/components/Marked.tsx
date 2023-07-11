import React from 'react'
import { marked } from 'marked'
import { mangle } from 'marked-mangle'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { useUIContext } from '../contexts'

interface Props {
  markdown: string
}

marked.use(mangle())
marked.use(gfmHeadingId({ prefix: 'markdown-heading-' }))

const Marked = ({ markdown }: Props) => {
  const { Div } = useUIContext()
  return <Div dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }} />
}

export default Marked
