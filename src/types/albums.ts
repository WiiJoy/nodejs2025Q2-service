export interface AlbumCreate {
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
}

export interface Album extends AlbumCreate {
    id: string; // uuid v4
}