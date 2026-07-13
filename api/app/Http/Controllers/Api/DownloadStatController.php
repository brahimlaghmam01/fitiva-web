<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DownloadStat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DownloadStatController extends Controller
{
    public function index()
    {
        try {
            $total = DownloadStat::sum('count');
            $byPlatform = DownloadStat::selectRaw('platform, sum(count) as total')
                ->groupBy('platform')
                ->pluck('total', 'platform');

            return response()->json([
                'total' => (int) $total,
                'by_platform' => $byPlatform,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch download stats: ' . $e->getMessage());
            return response()->json(['total' => 0, 'by_platform' => []], 500);
        }
    }

    public function increment(Request $request)
    {
        $validated = $request->validate([
            'platform' => 'nullable|string|in:ios,android,web',
        ]);

        $platform = $validated['platform'] ?? 'web';

        try {
            $stat = DownloadStat::firstOrCreate(
                ['platform' => $platform],
                ['count' => 0]
            );
            
            $stat->increment('count');

            $total = DownloadStat::sum('count');

            return response()->json([
                'message' => 'Download counted',
                'total' => (int) $total,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to increment download: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to count download'], 500);
        }
    }
}