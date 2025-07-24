import { CollectionConfig } from 'payload'

export const Cities: CollectionConfig = {
  slug: 'cities',
  admin: {
    useAsTitle: 'nameRU',
  },
  fields: [
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'nameRU',
      label: 'Название (RU)',
      type: 'text',
      required: true,
    },
    {
      name: 'prepositionalRU',
      label: 'В городе (RU)',
      type: 'text',
      required: true,
    },
    {
      name: 'isPopular',
      label: 'Популярный',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
