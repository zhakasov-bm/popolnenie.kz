import { Page } from '@/payload-types'
import Image from 'next/image'

export default function StepsBlock({ page }: { page: Page }) {
  const stepBlocks = (page.layout ?? []).filter((b) => b.blockType === 'stepsblock')

  return (
    <section className="pb-20">
      {stepBlocks.map((block, id) => {
        const steps = block.steps ?? []

        return (
          <div key={id} className="container-class">
            <h2>{block.stepTitle}</h2>

            <div className="flex flex-col items-center mt-20 relative">
              {/* Вертикальная линия */}
              {/* {id !== steps.length - 1 && (
                <div className="absolute w-1 bg-[#2C2C2C] h-full left-1/2 -translate-x-1/2 z-0"></div>
              )} */}

              {steps.map((step, i) => {
                const isLeft = i % 2 === 0
                const isLast = i === steps.length - 1

                return (
                  <div key={i} className="relative z-10 w-full flex flex-col items-center">
                    <div className="flex w-full justify-between items-center relative z-10">
                      {isLeft ? (
                        <>
                          <div className="w-5/12 text-right pr-6">
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
                          <div className="w-5/12 text-left pl-6">
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
