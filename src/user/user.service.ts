import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { User, CreateUserDto, UpdatePasswordDto, UserResponse } from 'src/types'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UserService {
    constructor(private database: DatabaseService) {}

    getAllUsers(): UserResponse {
        // console.log('get all!!!!!')
        // const users = 
        return {
            data: this.database.users.map(user => {
                const watchedUser = { ...user }
                delete watchedUser.password
                return watchedUser
            }),
            error: null
        }
    }

    getUserById(id: string): UserResponse {
        return {
            data: this.database.users.find(user => user.id === id),
            error: null
        }
    }

    createUser(dto: CreateUserDto): UserResponse {
        const timestamp = Date.now()
        const id = uuidv4()

        const createdUser = {
            ...dto,
            id,
            version: 1,
            createdAt: timestamp,
            updatedAt: timestamp
        }

        this.database.users.push(createdUser)

        return {
            data: createdUser,
            error: null
        }
    }

    updateUser(id: string, dto: UpdatePasswordDto): UserResponse {
        const updateUser = this.database.users.find(user => user.id === id)
        updateUser.updatedAt = Date.now()
        updateUser.password = dto.newPassword
        updateUser.version += 1

        return {
            data: updateUser,
            error: null
        }
    }

    removeUser(id: String): UserResponse {
        const index = this.database.users.findIndex(user => user.id === id)
        this.database.users.splice(index, 1)

        return {
            data: null,
            error: null
        }
    }
}
