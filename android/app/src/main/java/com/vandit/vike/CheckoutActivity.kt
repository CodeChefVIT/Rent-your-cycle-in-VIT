package com.vandit.vike

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.vandit.vike.databinding.ActivityCheckoutBinding

class CheckoutActivity : AppCompatActivity() {
    lateinit var binding: ActivityCheckoutBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCheckoutBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val bikeName = intent.getStringExtra("bikeName").toString()
        val companyName = intent.getStringExtra("companyName").toString()
        val bikeDetails = intent.getStringExtra("bikeDetails").toString()

        val renterName = intent.getStringExtra("renterName").toString()
        val renterBlock = intent.getStringExtra("renterBlock").toString()
        val renterRoom = intent.getStringExtra("renterRoom").toString()
        val renterNumber = intent.getStringExtra("renterNumber").toString()

        val bikeImage = intent.getStringExtra("bikeImage").toString()
        val bikePrice = intent.getStringExtra("bikePrice").toString()

        val renterBlockRoom = "$renterBlock $renterRoom"

        val sharedPref = getSharedPreferences("myPrefs",Context.MODE_PRIVATE)

        binding.apply {
            nameTV.text = bikeName
            priceTV.text = "Rs. ${bikePrice}/hr"

            val duration = durationTV.text.toString()
            val total = bikePrice.toInt() * duration.toInt()
            totalTV.text = "Rs. $total"

            submitBTN.setOnClickListener {
                with(sharedPref.edit()){
                    putString("bikeName", bikeName)
                    putString("companyName", companyName)
                    putString("bikeDetails", bikeDetails)

                    putString("renterName", renterName)
                    putString("renterBlockRoom", renterBlockRoom)
                    putString("renterNumber", renterNumber)

                    putString("bikePrice", bikePrice)
                    putString("bikeImage", bikeImage)
                    apply()
                }
                val intent = Intent(it.context, SuccessActivity::class.java)
                startActivity(intent)
            }
        }
    }
}