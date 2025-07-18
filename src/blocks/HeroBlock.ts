import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'heroblock',
  fields: [
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
      name: 'statistics',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'button',
      type: 'text',
      defaultValue: 'Заказать',
    },
  ],
}
