export interface detailComic {
    id: number,
    pageCount: number,
    title: string,
    description: string,
    format: string,
    dates: {
        date: Date
    }[]
    thumbnail: {
        path: string,
        extension: string
    }
}