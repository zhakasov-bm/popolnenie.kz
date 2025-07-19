import { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contact-block',
  labels: {
    singular: 'Contact Block',
    plural: 'Contact Blocks',
  },
  fields: [
    {
      name: 'heading',
      label: 'Заголовок',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Описание',
      type: 'textarea',
    },
    {
      name: 'address',
      label: 'Адрес',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'Телефон',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
    },
    {
      name: 'mapEmbedUrl',
      label: 'Google Maps Embed URL',
      type: 'text',
      admin: {
        description:
          'Вставьте ссылку с https://www.google.com/maps -> Поделиться -> Встроить карту',
      },
    },
  ],
}
