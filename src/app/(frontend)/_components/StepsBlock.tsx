import { Page, Post } from '@/payload-types'
import { RichText as SerializedRichText } from '@payloadcms/richtext-lexical/react'

import Image from 'next/image'

type Props = {
  layout: Page['layout'] | Post['layout']
}

export default function StepsBlock({ layout }: Props) {
  const stepBlocks = (layout ?? []).filter((b) => b.blockType === 'stepsblock')

  return (
    <section id="stepsblock" className="pb-8 md:pb-20">
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
              <div className="md:px-40 pb-32 flex items-center justify-center">
                <SerializedRichText className="payload-richtext" data={block.content} />
              </div>
            )}

            <h2 className="!pb-0">{block.stepTitle}</h2>

            <div className="flex flex-col items-center mt-16 relative">
              {/* Вертикальная линия */}
              {id !== steps.length - 1 && (
                <div className="hidden md:block absolute w-1 bg-[#2C2C2C] h-full left-1/2 -translate-x-1/2 z-0"></div>
              )}
              {steps.map((step, i) => {
                const isLeft = i % 2 === 0
                const isLast = i === steps.length - 1

                return (
                  <div key={i} className="relative z-10 w-full flex flex-col items-center">
                    {/* Mobile: icon left, text right; Desktop: alternate */}
                    <div className="flex w-full justify-between items-start relative z-10">
                      {/* Mobile layout: icon left, text right */}
                      <div className="flex w-full md:hidden items-start gap-4">
                        <div className="w-2/12 flex flex-col items-center p-0 m-0">
                          {typeof step.icon === 'object' && step.icon?.url && (
                            <div>
                              <Image
                                src={step.icon.url}
                                alt={step.icon.alt || ''}
                                width={50}
                                height={50}
                                className="contain"
                                draggable={false}
                              />
                            </div>
                          )}
                          {/* Vertical line directly under the icon, only if not last */}
                          {!isLast && <div className="w-1 h-36 bg-[#2C2C2C] z-0 p-0 m-0" />}
                        </div>
                        <div className="w-10/12 text-left flex flex-col justify-center">
                          <h4 className="font-unbounded pb-2 text-link">{step.title}</h4>
                          <p className="text-link/80 mb-2">{step.message}</p>
                        </div>
                      </div>
                      {/* Desktop layout: alternate left/right */}
                      <div className="hidden md:flex w-full justify-between items-start">
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
                    </div>

                    {/* Desktop: vertical line centered under icon, if not last */}
                    {!isLast && (
                      <div className="hidden md:flex w-full justify-center">
                        <div className="w-1 h-16 bg-[#2C2C2C] z-0" />
                      </div>
                    )}
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
