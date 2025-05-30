import { Injectable, Global } from '@nestjs/common'
import { Artist, User, Track, Album } from 'src/types'

@Global()
@Injectable()
export class DatabaseService {
    public users: User[];
    public artists: Artist[];
    public tracks: Track[];
    public albums: Album[];

    constructor() {
        this.users = [];
        this.artists = [];
        this.tracks = [];
        this.albums = [];
    }
}
