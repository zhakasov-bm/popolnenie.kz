import { Page } from '@/payload-types'

export default function ContactBlock({ page }: { page: Page }) {
  return (
    <section id="contact" className="bg-[#2C2C2C]">
      {(page.layout ?? []).map((block, id) => {
        if (block.blockType === 'contact-block') {
          return (
            <div key={id} className="flex gap-4 text-white">
              <div className="flex flex-col gap-10 w-1/2 pl-20 justify-center">
                <h3 className="font-unbounded text-3xl">{block.heading}</h3>
                <p className="text-xl font-extralight">{block.phone}</p>
                <div className="flex flex-col gap-1 text-lg font-extralight">
                  <p>{block.description}</p>
                  <p>{block.address}</p>
                </div>
              </div>

              <div className=" h-[300px] md:h-[400px] w-1/2">
                <iframe
                  src={block.mapEmbedUrl || ''}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
