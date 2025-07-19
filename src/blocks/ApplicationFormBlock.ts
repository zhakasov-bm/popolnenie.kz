import { Block } from 'payload'

export const ApplicationFormBlock: Block = {
  slug: 'application-form',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Заявка на пополнение',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
}
