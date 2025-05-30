import { errors } from './common';

export interface TrackCreate {
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
}

export interface Track extends TrackCreate {
    id: string; // uuid v4
}

export interface TrackResponse {
    data: Track | Track[] | null
    error: errors | null
}
