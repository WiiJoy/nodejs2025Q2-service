export interface TrackCreate {
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
}

export interface Track extends TrackCreate {
    id: string; // uuid v4
}