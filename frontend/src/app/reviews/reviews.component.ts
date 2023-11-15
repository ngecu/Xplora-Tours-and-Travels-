import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from '../interfaces/review';
import { ReviewsService } from '../services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  error: boolean = false;
  errorMessage: string = '';

  constructor(private reviewsService: ReviewsService, private router: Router) {}

  ngOnInit(): void {
    this.getReviews();
  }

  async getReviews() {
    try {
      const response = await this.reviewsService.getReviews();
      console.log(response.reviews);

      this.reviews = response.reviews;
    } catch (error) {
      console.error(error);
      this.error = true;
      this.errorMessage = 'Error fetching reviews';
    }
  }

  showReviewDetails(review: Review) {
    console.log(review.review_id);
    // Navigate to the review details page
    this.router.navigate(['reviews', review.review_id]);
  }

  editReview(review: Review) {
    console.log(review.review_id);
    // Navigate to the review edit page
    this.router.navigate(['reviews', 'edit', review.review_id]);
  }

  async deleteReview(review: Review) {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        const review_id = review.review_id as string;
        const response = await this.reviewsService.deleteReview(review_id);

        if (response.error) {
          alert(response.error);

          setTimeout(() => {
            this.errorMessage = '';
            this.error = false;
          }, 3000);
        } else if (response.message) {
          // Refresh the reviews after deletion
          this.getReviews();
        }
      } catch (error) {
        console.error(error);
        this.error = true;
        this.errorMessage = 'Error deleting review';
      }
    }
  }
}
