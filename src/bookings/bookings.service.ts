import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { UserService } from '../users/users.service';
import { ServicesService } from '../services/services.service';
import { User } from '../users/entities/user.entity';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    private readonly userService: UserService,
    private readonly servicesService: ServicesService,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const email = createBookingDto.email;

    let user = await this.userService.findOneByEmail(email);

    if (user instanceof NotFoundException) {
      user = await this.userService.create({
        email: email,
        name: createBookingDto.name,
        password: Array.from({ length: 8 }, () =>
          Math.floor(Math.random() * 10),
        ).join(''),
        phone: createBookingDto.phone,
      });
    }

    const bookedService = await this.servicesService.findOne(
      createBookingDto.service,
    );

    const booking = this.bookingRepository.create({
      location: createBookingDto.location,
      service: bookedService,
      message: createBookingDto.message,
      time: createBookingDto.time,
      user: user as User,
    });

    return await this.bookingRepository.save(booking);
  }

  async findAll() {
    return await this.bookingRepository.find({
      select: {
        user: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
        service: {
          title: true,
          id: true,
          coverImage: true,
        },
      },
      relations: {
        user: true,
        service: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findOne(id: string) {
    const existingBooking = await this.bookingRepository.findOneBy({ id });
    if (!existingBooking) throw new NotFoundException('Booking not found');
    return existingBooking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const existingBooking = await this.findOne(id);

    const user = await this.userService.findOneByEmail(updateBookingDto.email);

    if (!user) throw new NotFoundException('User not found');

    let service: Service;
    if (updateBookingDto.service) {
      const bookedService = await this.servicesService.findOne(
        updateBookingDto.service,
      );

      if (!bookedService) throw new NotFoundException('Service not found');

      service = bookedService;
    } else {
      service = await this.servicesService.findOne(existingBooking.service?.id);
    }

    Object.assign(existingBooking, {
      location: updateBookingDto.location,
      message: updateBookingDto.message,
      time: updateBookingDto.time,
      user,
      service: service,
    });

    return await this.bookingRepository.save(existingBooking);
  }
  async changeStatus(id: string) {}

  async remove(id: string) {
    const existingBooking = await this.findOne(id);
    return await this.bookingRepository.softRemove(existingBooking);
  }
}
