import { Page } from '@/payload-types'

export default function ContactBlock({ page }: { page: Page }) {
  return (
    <section id="contact" className="bg-[#2C2C2C] border-t border-link/10">
      {(page.layout ?? []).map((block, id) => {
        if (block.blockType === 'contact-block') {
          return (
            <div key={id} className="flex flex-col md:flex-row gap-4 text-white">
              <div className="flex flex-col gap-8 md:gap-10 md:w-1/2 p-6 md:pl-20 justify-center">
                <h3 className="font-unbounded text-xl md:text-3xl">{block.heading}</h3>
                <p className="text-lg md:text-xl font-extralight">{block.phone}</p>
                <div className="flex flex-col gap-1 text-sm md:text-lg font-extralight">
                  <p>{block.description}</p>
                  <p>{block.address}</p>
                </div>
              </div>

              <div className=" h-[300px] md:h-[400px] md:w-1/2">
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
