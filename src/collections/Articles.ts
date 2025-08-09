import { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Блог',
    plural: 'Блоги',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      label: 'Мета-описание',
    },
    {
      name: 'image',
      label: 'Изображение',
      type: 'upload',
      relationTo: 'media',
      required: false,
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
