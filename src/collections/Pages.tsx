import { ApplicationFormBlock } from '@/blocks/ApplicationFormBlock'
import { BrandsBlock } from '@/blocks/BrandsBlock'
import { ContactBlock } from '@/blocks/ContactBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { ReviewsBlock } from '@/blocks/ReviewsBlock'
import { sharedBlocks } from '@/blocks/sharedBlocks'
import { TarifBlock } from '@/blocks/TarifBlock'
import { TeamBlock } from '@/blocks/TeamBlock'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название страницы',
    },
    {
      name: 'layout',
      type: 'blocks',
      required: false,
      minRows: 0,
      blocks: [
        HeroBlock,
        TarifBlock,
        TeamBlock,
        ReviewsBlock,
        BrandsBlock,
        ApplicationFormBlock,
        ContactBlock,
        ...sharedBlocks,
      ],
    },
  ],
}
