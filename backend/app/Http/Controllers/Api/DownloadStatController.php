<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DownloadStat;
use Illuminate\Http\Request;

class DownloadStatController extends Controller
{
    public function index()
    {
        $total = DownloadStat::sum('count');
        $byPlatform = DownloadStat::selectRaw('platform, sum(count) as total')
            ->groupBy('platform')
            ->pluck('total', 'platform');

        return response()->json([
            'total' => $total,
            'by_platform' => $byPlatform,
        ]);
    }

    public function increment(Request $request)
    {
        $validated = $request->validate([
            'platform' => 'nullable|string|in:ios,android,web',
        ]);

        $platform = $validated['platform'] ?? 'web';

        $stat = DownloadStat::where('platform', $platform)->first();
        
        if ($stat) {
            $stat->increment('count');
        } else {
            DownloadStat::create(['platform' => $platform, 'count' => 1]);
        }

        $total = DownloadStat::sum('count');

        return response()->json([
            'message' => 'Download counted',
            'total' => $total,
        ]);
    }
}