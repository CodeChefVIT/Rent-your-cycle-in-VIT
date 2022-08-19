package com.vandit.vike.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.LinearLayoutManager
import com.vandit.vike.R
import com.vandit.vike.adapters.ExpandableAdapter
import com.vandit.vike.databinding.FragmentHomeBinding
import com.vandit.vike.models.BikeData

class HomeFragment : Fragment() {
    lateinit var binding: FragmentHomeBinding

    private val bikeList = mutableListOf<BikeData>()
    private val adapter = ExpandableAdapter()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_home, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.recView.adapter = adapter
        binding.recView.layoutManager = LinearLayoutManager(requireContext())

        bikeList.addAll(
            listOf(BikeData("vandit", "R", 1101, "8799002450", "FX390 HT", "hercules", "6 speed, 16 gears\n" + "Bottle holder", 10, "https://www.trackandtrail.in/sites/default/files/styles/listing_image/public/fx-390_0.png?itok=NtkWOcMD"), BikeData("aman", "R", 1104, "8393048390", "FX390 HT", "hercules", "6 speed, 16 gears\n" + "Bottle holder", 12, "https://www.trackandtrail.in/sites/default/files/styles/listing_image/public/fx-390_0.png?itok=NtkWOcMD"))
        )
        adapter.submitList(bikeList.toMutableList())
    }
}