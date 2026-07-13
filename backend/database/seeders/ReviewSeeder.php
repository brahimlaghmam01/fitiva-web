<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $reviews = [
            [
                'name' => 'Maya Zong',
                'role' => 'Student',
                'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                'content' => 'Habitline made my mornings feel manageable again.',
                'rating' => 5,
            ],
            [
                'name' => 'Ethan Miller',
                'role' => 'Gym Trainer',
                'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
                'content' => 'I used to ignore reminders from other apps, but these feel calm and well-timed. It\'s like the app knows when I\'m actually able to do something.',
                'rating' => 5,
            ],
            [
                'name' => 'Hannah Lee',
                'role' => 'Content Writer',
                'avatar' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
                'content' => 'It\'s the first habit app that doesn\'t overwhelm me.',
                'rating' => 5,
            ],
            [
                'name' => 'Daniel Perez',
                'role' => 'Software Engineer',
                'avatar' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
                'content' => 'The weekly insights are what sold me. They show exactly where I fall off and help me adjust without feeling guilty or overwhelmed.',
                'rating' => 5,
            ],
            [
                'name' => 'Laura Kim',
                'role' => 'Product Designer',
                'avatar' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
                'content' => 'Focus blocks changed the way I work. I get more done in two hours now than what used to take half a day.',
                'rating' => 5,
            ],
            [
                'name' => 'Priya Shah',
                'role' => 'Marketing Specialist',
                'avatar' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
                'content' => 'I actually stick to my routines now. Small steps finally add up',
                'rating' => 4,
            ],
            [
                'name' => 'Sofia Martinez',
                'role' => 'UX Researcher',
                'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                'content' => 'Feels tailored to my day and keeps me motivated.',
                'rating' => 5,
            ],
            [
                'name' => 'Alex Johnson',
                'role' => 'Freelancer',
                'avatar' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
                'content' => 'The best fitness companion I\'ve ever used. The AI coaching is incredible!',
                'rating' => 5,
            ],
            [
                'name' => 'Sarah Chen',
                'role' => 'Doctor',
                'avatar' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
                'content' => 'Finally an app that understands work-life balance. Highly recommended.',
                'rating' => 4,
            ],
        ];

        foreach ($reviews as $review) {
            Review::create(array_merge($review, ['is_published' => true]));
        }
    }
}