import { errors } from "./common";

export interface AlbumCreate {
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
}

export interface Album extends AlbumCreate {
    id: string; // uuid v4
}

export interface AlbumResponse {
    data: Album | Album[] | null
    error: errors | null
}
