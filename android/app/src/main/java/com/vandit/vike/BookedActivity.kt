package com.vandit.vike

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.bumptech.glide.Glide
import com.vandit.vike.databinding.ActivityBookedBinding

class BookedActivity : AppCompatActivity() {
    lateinit var binding: ActivityBookedBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityBookedBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val sharedPref = getSharedPreferences("myPrefs",Context.MODE_PRIVATE)

        val bikeName = sharedPref.getString("bikeName", null)
        val companyName = sharedPref.getString("companyName", null)
        val bikeDetails = sharedPref.getString("bikeDetails", null)

        val renterName = sharedPref.getString("renterName", null)
        val renterBlockRoom = sharedPref.getString("renterBlockRoom", null)
        val renterNumber = sharedPref.getString("renterNumber", null)

        val bikePrice = sharedPref.getString("bikePrice", null)
        val bikeImage = sharedPref.getString("bikeImage", null)

        binding.apply {
            this.bikeName.text = bikeName
            description.text = bikeDetails
            this.renterName.text = renterName
            renterBlock.text = renterBlockRoom
            this.renterNumber.text = renterNumber

            Glide.with(this.bikeImage)
                .load(bikeImage)
                .into(this.bikeImage)
        }
    }
}