<?php

namespace App\Helpers;

class Utility
{
    /**
     * Get project tag progress color based on it's completeness percentage
     *
     * @return string
     */
    public static function getProgressColor(float $percentage = 0)
    {
        if ($percentage <= 35.0) {
            return '#ffbb00';
        } else if ($percentage <= 65) {
            return '#894fc6';
        } else {
            return '#07e642';
        }
    }
}
