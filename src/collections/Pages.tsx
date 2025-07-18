import { AdvantagesBlock } from '@/blocks/AdvantagesBlock'
import { BrandsBlock } from '@/blocks/BrandsBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { ReviewsBlock } from '@/blocks/ReviewsBlock'
import { StepsBlock } from '@/blocks/StepsBlock'
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
        AdvantagesBlock,
        TarifBlock,
        StepsBlock,
        TeamBlock,
        ReviewsBlock,
        BrandsBlock,
      ],
    },
  ],
}
