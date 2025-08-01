import { CollectionConfig } from 'payload'
import { sharedBlocks } from '@/blocks/sharedBlocks'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Заголовок',
    },
    {
      name: 'subheading',
      type: 'richText',
      required: true,
      label: 'Подзаголовок',
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      label: 'Мета-описание',
    },
    {
      name: 'button',
      type: 'text',
      defaultValue: 'Заказать',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'layout',
      type: 'blocks',
      required: false,
      minRows: 0,
      blocks: [...sharedBlocks],
    },
    {
      name: 'includedInBlog',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
