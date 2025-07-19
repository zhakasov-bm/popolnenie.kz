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
              <div className="flex gap-3 flex-shrink-0 min-w-[280px]">
                {block.reviews?.map((review, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex flex-col gap-10 justify-between bg-white rounded-custom p-8"
                    >
                      <p className="text-link/70">{review.message}</p>
                      <div className="flex gap-3">
                        {typeof review.avatar === 'object' && review.avatar.url && (
                          <Image
                            src={review.avatar.url}
                            alt={review.avatar.alt}
                            width={50}
                            height={0}
                            className="contain"
                            draggable={false}
                          />
                        )}
                        <div className="flex flex-col gap-0 text-lg">
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-link/70 text-sm">{review.position}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }
      })}
    </section>
  )
}
