'use client'

import { Page } from '@/payload-types'
import Image from 'next/image'

import 'react-phone-input-2/lib/style.css'

export default function ReviewsBlock({ page }: { page: Page }) {
  return (
    <section className="bg-background">
      {(page.layout ?? []).map((block, id) => {
        if (block.blockType === 'reviews') {
          return (
            <div key={id} className="container mx-auto px-6 lg:px-16 py-28">
              <h2>{block.heading}</h2>
              <div className="w-full overflow-x-auto md:overflow-visible">
                <div className="flex md:grid md:grid-cols-2 gap-4 px-4">
                  {block.reviews?.map((review, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-[calc(100vw-3rem)] md:w-auto flex flex-col gap-12 justify-between bg-white rounded-custom p-6"
                    >
                      <p className="text-link/70">{review.message}</p>
                      <div className="flex gap-3 items-center">
                        {typeof review.avatar === 'object' && review.avatar.url && (
                          <Image
                            src={review.avatar.url}
                            alt={review.avatar.alt}
                            width={50}
                            height={50}
                            className="object-contain rounded-full"
                            draggable={false}
                          />
                        )}
                        <div className="flex flex-col text-lg">
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-link/70 text-sm">{review.position}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
