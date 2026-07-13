<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ReviewController extends Controller
{
    public function index()
    {
        try {
            $reviews = Review::where('is_published', true)
                ->latest()
                ->take(9)
                ->get()
                ->map(function ($review) {
                    return [
                        'id' => $review->id,
                        'name' => htmlspecialchars($review->name, ENT_QUOTES, 'UTF-8'),
                        'role' => $review->role ? htmlspecialchars($review->role, ENT_QUOTES, 'UTF-8') : null,
                        'avatar' => $review->avatar ? filter_var($review->avatar, FILTER_VALIDATE_URL) ? $review->avatar : null : null,
                        'content' => htmlspecialchars($review->content, ENT_QUOTES, 'UTF-8'),
                        'rating' => (int) $review->rating,
                        'created_at' => $review->created_at->toISOString(),
                    ];
                });

            return response()->json($reviews);
        } catch (\Exception $e) {
            Log::error('Failed to fetch reviews: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch reviews'], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|regex:/^[\pL\s\'\-\x{0600}-\x{06FF}]+$/u',
            'email' => 'nullable|email|max:255',
            'role' => 'nullable|string|max:255|regex:/^[\pL\s\'\-\x{0600}-\x{06FF}]+$/u',
            'content' => 'required|string|min:10|max:1000',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        try {
            $review = Review::create([
                'name' => strip_tags($validated['name']),
                'email' => $validated['email'] ?? null,
                'role' => $validated['role'] ? strip_tags($validated['role']) : null,
                'content' => strip_tags($validated['content']),
                'rating' => $validated['rating'] ?? 5,
                'is_published' => true,
            ]);
            
            return response()->json([
                'message' => 'Thank you for your review!',
                'review' => [
                    'id' => $review->id,
                    'name' => htmlspecialchars($review->name, ENT_QUOTES, 'UTF-8'),
                    'role' => $review->role ? htmlspecialchars($review->role, ENT_QUOTES, 'UTF-8') : null,
                    'avatar' => $review->avatar,
                    'content' => htmlspecialchars($review->content, ENT_QUOTES, 'UTF-8'),
                    'rating' => (int) $review->rating,
                    'created_at' => $review->created_at->toISOString(),
                ],
            ], 201);
        } catch (\Exception $e) {
            Log::error('Failed to create review: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to submit review. Please try again.'], 500);
        }
    }
}