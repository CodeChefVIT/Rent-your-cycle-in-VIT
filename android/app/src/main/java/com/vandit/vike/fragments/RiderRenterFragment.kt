package com.vandit.vike.fragments

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.Navigation
import com.vandit.vike.HomeActivity
import com.vandit.vike.R
import com.vandit.vike.databinding.FragmentRiderRenterBinding

class RiderRenterFragment : Fragment() {
    lateinit var binding: FragmentRiderRenterBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_rider_renter, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.apply {
            renterBTN.setOnClickListener {
                Navigation.findNavController(it).navigate(R.id.action_riderRenterFragment_to_renterDetailsFragment)
            }

            riderBTN.setOnClickListener {
                val intent = Intent(activity, HomeActivity::class.java)
                startActivity(intent)
            }
        }
    }
}