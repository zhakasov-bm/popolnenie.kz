import { RichText } from '@payloadcms/richtext-lexical/react'
import { Page, Post } from '@/payload-types'

type Props = {
  layout: Page['layout'] | Post['layout']
}

export default function AdvantagesBlock({ layout }: Props) {
  return (
    <section id="advantagesblock" className="container-class pb-8">
      {(layout ?? []).map((block, id) => {
        if (block.blockType === 'advantagesblock') {
          return (
            <div key={id}>
              <RichText data={block.advantagesTitle} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-8">
                {block.advantages?.map((adv, idx) => (
                  <div
                    key={idx}
                    className="bg-blueBG py-5 px-8 rounded-custom relative overflow-hidden flex flex-col min-h-[240px]"
                  >
                    <div className="text-black/5 font-bold text-[240px] font-montserrat absolute top-0 right-0 leading-none">
                      {idx + 1}
                    </div>
                    <div className="relative z-10 mt-auto pt-16 adv-richtext text-black">
                      {adv.advantage && <RichText data={adv.advantage} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
