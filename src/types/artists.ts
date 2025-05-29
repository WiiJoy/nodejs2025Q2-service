export interface ArtistCreate {
    name: string;
    grammy: boolean;
}

export interface Artist extends ArtistCreate {
    id: string; // uuid v4
}