package com.vandit.vike

import androidx.cardview.widget.CardView
import com.vandit.vike.models.BikeData

interface ItemOnClickListener {
    fun onClick(item: BikeData, v: CardView, position:Int)
}