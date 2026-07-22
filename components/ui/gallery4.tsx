"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

export interface Gallery4Item {
  id: string
  title: string
  description: string
  href: string
  image: string
}

export interface Gallery4Props {
  title?: string
  description?: string
  items: Gallery4Item[]
}

const Gallery4 = ({ title, description, items }: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!carouselApi) return
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }
    updateSelection()
    carouselApi.on("select", updateSelection)
    return () => {
      carouselApi.off("select", updateSelection)
    }
  }, [carouselApi])

  const hasHeader = Boolean(title || description)

  return (
    <section className={cn(hasHeader ? "py-16 md:py-24" : "py-2 md:py-4")}>
      <div className="container mx-auto">
        <div
          className={cn(
            "flex items-end",
            hasHeader
              ? "mb-8 justify-between md:mb-14 lg:mb-16"
              : "mb-6 justify-end md:mb-8",
          )}
        >
          {hasHeader && (
            <div className="flex flex-col gap-4">
              {title && (
                <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl text-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p className="max-w-lg text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
              aria-label="Previous"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
              aria-label="Next"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group rounded-xl"
                >
                  <div className="group relative flex h-full min-h-[27rem] max-w-full flex-col overflow-hidden rounded-xl border border-primary/20 bg-card md:aspect-[5/4] lg:aspect-[16/9]">
                    <div className="relative flex h-1/2 items-center justify-center bg-gradient-to-br from-primary/15 via-primary/5 to-primary/20 p-8">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-24 w-auto max-w-[70%] object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                      <div>
                        <div className="mb-2 text-lg font-semibold text-foreground md:mb-3 md:text-xl">
                          {item.title}
                        </div>
                        <div className="line-clamp-3 text-sm text-muted-foreground md:text-base">
                          {item.description}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-sm font-medium text-primary">
                        Read more
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Gallery4 }
