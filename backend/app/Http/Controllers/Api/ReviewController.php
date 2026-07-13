<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::where('is_published', true)
            ->latest()
            ->take(9)
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'name' => $review->name,
                    'role' => $review->role,
                    'avatar' => $review->avatar,
                    'content' => $review->content,
                    'rating' => $review->rating,
                    'created_at' => $review->created_at,
                ];
            });

        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'role' => 'nullable|string|max:255',
            'content' => 'required|string|min:10|max:1000',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        $review = Review::create([
            'name' => $validated['name'],
            'email' => $validated['email'] ?? null,
            'role' => $validated['role'] ?? null,
            'content' => $validated['content'],
            'rating' => $validated['rating'] ?? 5,
            'is_published' => true,
        ]);
        
        return response()->json([
            'message' => 'Thank you for your review!',
            'review' => [
                'id' => $review->id,
                'name' => $review->name,
                'role' => $review->role,
                'avatar' => $review->avatar,
                'content' => $review->content,
                'rating' => $review->rating,
                'created_at' => $review->created_at,
            ],
        ], 201);
    }
}