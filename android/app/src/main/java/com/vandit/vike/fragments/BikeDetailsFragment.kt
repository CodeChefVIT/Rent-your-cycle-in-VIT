package com.vandit.vike.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.navigation.Navigation
import com.vandit.vike.R
import com.vandit.vike.databinding.FragmentBikeDetailsBinding

class BikeDetailsFragment : Fragment() {
    lateinit var binding:FragmentBikeDetailsBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater,
            R.layout.fragment_bike_details, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.apply {
            nextBTN.setOnClickListener {
                Navigation.findNavController(it).navigate(R.id.action_bikeDetailsFragment_to_priceFragment)
            }
        }
    }
}