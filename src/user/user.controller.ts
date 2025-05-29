import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, UpdatePasswordDto } from 'src/types'

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get()
    getAll() {
        console.log('get all users')
        const res = this.userService.getAllUsers()
        return res.data
    }

    @Get('id')
    getUser(@Param('id', ParseUUIDPipe) id: string) {
        const res = this.userService.getUserById(id)
        return res.data
    }

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        const res = this.userService.createUser(dto)
        return res.data
    }

    @Put(':id')
    changeUser(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePasswordDto) {
        const res = this.userService.updateUser(id, dto)
        return res.data
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseUUIDPipe) id: string): void {
        const res = this.userService.removeUser(id)
    }
}