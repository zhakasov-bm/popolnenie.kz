import { Block } from 'payload'

export const ArticleBlock: Block = {
  slug: 'articles',
  labels: {
    singular: 'Article Block',
    plural: 'Article Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Последнее из блога',
      required: true,
    },
  ],
}
