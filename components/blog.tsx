// @ts-nocheck
import Link from 'next/link'
import { Page } from 'nextra'
import { getPagesUnderRoute } from 'nextra/context'
import { useRouter } from 'nextra/hooks'
import type { MdxFile } from 'nextra'
import { sortDate } from "@utils/date"


export function Blog() {
  const { locale } = useRouter()
  const pages: Page[] = getPagesUnderRoute(`/${locale}/posts`);
  const filtered: MdxFile[] = pages.filter((page) => "frontMatter" in page).map(page => page as MdxFile)
  const blogPages: MdxFile[] = filtered.sort(sortDate)

  const blogs = blogPages.map((page: MdxFile, index: number) => {
    if ("frontMatter" in page) {
      let title = undefined
      let pageName = undefined
      let description = undefined
      if (page.frontMatter) {
        if (page.frontMatter.title) {
          title = page.frontMatter.title
        }
        if (page.frontMatter.description) {
          description = page.frontMatter.description
        }
      }

      if (page.name) {
        pageName = page.name
      }
      return (
        <Link className='flex w-[80%] cursor-pointer flex-col overflow-hidden rounded-[20px] border border-solid bg-white transition-colors hover:border-[#7F818C] hover:!no-underline dark:border-transparent dark:bg-[#101218] hover:dark:border-[#7F818C]' href={page.route} key={index}>
          {/* <img src="https://the-guild.dev/blog-assets/building-random-gif-generator-with-fets-and-giphy/banner.png" alt="Article logo" className="drag-none h-[164px] w-full object-cover"></img> */}
          <div className='flex grow flex-col p-5'>
            <div key={page.route} className=''>
              <div

                className="m-0 mb-2 text-lg font-bold leading-7 dark:text-gray-50 line-clamp-3 [hyphens:auto]"
              >
                {title ? title : (page.name ? page.name : "")}
                {/* {page.meta?.title || page.frontMatter.title || page.name} */}
              </div>
              <p className="text-gray-500 mb-6 text-xs line-clamp-4 overflow-hidden text-ellipsis !leading-[18px] [hyphens:auto]">
                {page.frontMatter.description}
              </p>
              <div className="mt-auto text-xs">
                <time dateTime={page.frontMatter.date.toISOString()} className="text-sm">
                  {page.frontMatter.date.toLocaleDateString(locale, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </div>
        </Link>
      )
    }

  })
  return <div className='my-12 flex flex-wrap justify-center gap-5'>{blogs}</div>
}
