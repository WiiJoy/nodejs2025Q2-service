import { Injectable, Global } from '@nestjs/common'
import { User } from 'src/types'

@Global()
@Injectable()
export class DatabaseService {
    public users: User[]

    constructor() {
        this.users = []
    }
}
