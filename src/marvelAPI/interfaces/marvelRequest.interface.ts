export interface MarvelRequest<T> {
    data: {
        total: number,
        results: T[]
    }
}