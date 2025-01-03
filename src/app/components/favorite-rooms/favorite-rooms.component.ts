// Import necessary Angular modules and components
import { Component, OnInit } from '@angular/core'; // Imports Angular core components.
import { ApiService } from '../../services/api.service'; // ApiService for backend calls.
import { CurrencyPipe } from '@angular/common'; // Pipe to format currency in templates.
import { RoomDetails } from '../../interfaces/rooms-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-rooms',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './favorite-rooms.component.html',
  styleUrls: ['./favorite-rooms.component.scss'], // Corrected 'styleUrl' to 'styleUrls'
})
export class FavoriteRoomsComponent implements OnInit {
  favoriteRoomsList: RoomDetails[] = []; // Stores fetched favorite rooms data.
  errorMessage: string | null = null; // Stores error message if the API request fails.

  skeletonArray: number[] = Array(6).fill(0); // Array with 6 elements

  constructor(private apiService: ApiService, private router: Router) {} // Inject services.

  ngOnInit(): void {
    this.getFavoriteRooms(); // Fetch favorite rooms when the component initializes.
  }

  // Fetch favorite rooms and handle response.
  getFavoriteRooms() {
    this.apiService.getFavoriteRooms().subscribe({
      next: (data) => {
        // Limit to the first 6 rooms for display.
        this.favoriteRoomsList = data.slice(0, 6);
        this.errorMessage = null; // Clear previous error if any.
      },
      error: (error) => {
        this.errorMessage = error; // Set error message on failure.
      },
    });
  }

  // Navigate to room details page.
  navigateToRoomDetails(roomId: number) {
    this.router.navigate(['/room-details', roomId]);
  }
}
