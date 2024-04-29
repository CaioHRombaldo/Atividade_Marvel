export interface detailCriador {
    id: number,
    fullName: string,
    thumbnail: {
        path: string,
        extension: string
    },
    comics: {
        available: number,
        collectionURI: string
    }
}