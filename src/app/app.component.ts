import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  rooms: { floor: number; roomNumber: number; booked: boolean }[] = [];
  bookingCount: number = 0;
  message: string = '';

  constructor() {
    this.initializeRooms();
  }

  initializeRooms() {
    for (let floor = 1; floor <= 10; floor++) {
      const roomCount = floor === 10 ? 7 : 10;
      for (let i = 1; i <= roomCount; i++) {
        const roomNumber = floor * 100 + i;
        this.rooms.push({ floor, roomNumber, booked: false });
      }
    }
  }

  // initializeRooms() {
  //   for (let floor = 10; floor >= 1; floor--) {
  //     const roomCount = floor === 10 ? 7 : 10;
  //     for (let i = 1; i <= roomCount; i++) {
  //       const roomNumber = floor * 100 + i;
  //       this.rooms.push({ floor, roomNumber, booked: false });
  //     }
  //   }
  // }

  bookRooms() {
    if (this.bookingCount < 1 || this.bookingCount > 5) {
      this.message = 'Please enter a valid number of rooms (1-5).';
      return;
    }

    const availableRooms = this.rooms.filter((room) => !room.booked);

    if (availableRooms.length < this.bookingCount) {
      this.message = 'Not enough rooms available to fulfill the request.';
      return;
    }

    availableRooms.sort(
      (a, b) => a.floor - b.floor || a.roomNumber - b.roomNumber
    );

    for (let i = 0; i < this.bookingCount; i++) {
      availableRooms[i].booked = true;
    }

    this.message = `${this.bookingCount} room(s) successfully booked.`;
    this.bookingCount = 0;
  }

  resetRooms() {
    this.rooms.forEach((room) => (room.booked = false));
    this.message = 'All bookings have been reset.';
  }

  randomizeOccupancy() {
    this.rooms.forEach((room) => (room.booked = Math.random() < 0.3));
    this.message = 'Random room occupancy generated.';
  }
}
