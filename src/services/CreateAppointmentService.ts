import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentsRepository;

  constructor(appointmentRepository: AppointmentsRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked.');
    }
    const appointment = this.appointmentRepository.create(
      provider,
      appointmentDate,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
