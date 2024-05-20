import type { MdxFile, PageMapItem } from 'nextra'
import traverse from "./traverse"
import { sortDate } from './date'
// import { LayoutProps } from "nextra-theme-blog/types"


const isNav = (page: PageMapItem): page is MdxFile => {
    const type = 'frontMatter' in page && page.frontMatter?.type
    return type && ['page', 'posts'].includes(type)
}
const isPost = (page: PageMapItem): page is MdxFile => {
    // if (
    //     page.kind === 'Folder' ||
    //     page.kind === 'Meta' ||
    //     page.name.startsWith('_')
    // )
    //     return false
    if ("frontMatter" in page) {
        const { draft, type } = page.frontMatter || {}
        return !draft && (!type || type === 'post')
    } else {
        return false
    }
}

export const collectPostsAndNavs = ({ opts }: any) => { // LayoutProps
    const posts: MdxFile[] = []
    const navPages: (MdxFile & { active: boolean })[] = []
    const { route } = opts
    traverse(opts.pageMap, page => {
        if (isNav(page)) {
            navPages.push({ ...page, active: page.route === route })
        }
        if (isPost(page)) {
            posts.push(page)
        }
    })
    posts.sort(sortDate)
    navPages.sort(sortDate)
    return { posts, navPages }
}