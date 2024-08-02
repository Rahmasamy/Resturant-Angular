import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  standalone: true,
  styleUrls: ['./star-rating.component.scss'],
  imports:[NgFor,NgClass]
})
export class StarRatingComponent {
  @Input() rating: number = 0; // Rating value from 0 to 5
  @Input() maxStars: number = 5; // Maximum number of stars

  getStars(): number[] {
    return Array.from({ length: this.maxStars }, (_, index) => index + 1);
  }

  isStarFilled(star: number): boolean {
    return star <= this.rating;
  }
}
