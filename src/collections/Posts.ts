import { CollectionConfig } from 'payload'

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
      name: 'includedInBlog',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
