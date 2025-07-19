import { Page, Post } from '@/payload-types'
import { RichText as SerializedRichText } from '@payloadcms/richtext-lexical/react'

import Image from 'next/image'

type Props = {
  layout: Page['layout'] | Post['layout']
}

export default function StepsBlock({ layout }: Props) {
  const stepBlocks = (layout ?? []).filter((b) => b.blockType === 'stepsblock')

  return (
    <section className="pb-20">
      {stepBlocks.map((block, id) => {
        const steps = block.steps ?? []

        return (
          <div
            key={id}
            className="container-class"
            style={{
              backgroundImage: 'url("/graphic.svg")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom center',
              backgroundSize: 'contain',
            }}
          >
            {block.content && (
              <div className="px-40 pb-32 flex items-center justify-center">
                <SerializedRichText className="payload-richtext" data={block.content} />
              </div>
            )}

            <h2>{block.stepTitle}</h2>

            <div className="flex flex-col items-center mt-16 relative">
              {/* Вертикальная линия */}
              {id !== steps.length - 1 && (
                <div className="absolute w-1 bg-[#2C2C2C] h-full left-1/2 -translate-x-1/2 z-0"></div>
              )}

              {steps.map((step, i) => {
                const isLeft = i % 2 === 0
                const isLast = i === steps.length - 1

                return (
                  <div key={i} className="relative z-10 w-full flex flex-col items-center">
                    <div className="flex w-full justify-between items-start relative z-10">
                      {isLeft ? (
                        <>
                          <div className="w-5/12 text-right">
                            <h4 className="font-unbounded pb-2 text-link">{step.title}</h4>
                            <p className="text-link/80">{step.message}</p>
                          </div>
                          <div className="w-1/12 flex justify-center">
                            {typeof step.icon === 'object' && step.icon?.url && (
                              <div>
                                <Image
                                  src={step.icon.url}
                                  alt={step.icon.alt || ''}
                                  width={60}
                                  height={60}
                                  className="contain"
                                  draggable={false}
                                />
                              </div>
                            )}
                          </div>
                          <div className="w-5/12" />
                        </>
                      ) : (
                        <>
                          <div className="w-5/12" />
                          <div className="w-1/12 flex justify-center">
                            {typeof step.icon === 'object' && step.icon?.url && (
                              <div>
                                <Image
                                  src={step.icon.url}
                                  alt={step.icon.alt || ''}
                                  width={60}
                                  height={60}
                                  className="contain"
                                  draggable={false}
                                />
                              </div>
                            )}
                          </div>
                          <div className="w-5/12 text-left">
                            <h4 className="font-unbounded pb-2 text-link">{step.title}</h4>
                            <p className="text-link/80">{step.message}</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Линия под иконкой, если не последний */}
                    {!isLast && <div className="w-1 h-16 bg-[#2C2C2C] z-0" />}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </section>
  )
}
