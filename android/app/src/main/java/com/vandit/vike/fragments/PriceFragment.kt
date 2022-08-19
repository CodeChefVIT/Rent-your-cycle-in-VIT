package com.vandit.vike.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.Navigation
import com.vandit.vike.R
import com.vandit.vike.databinding.FragmentPriceBinding

class PriceFragment : Fragment() {
    lateinit var binding: FragmentPriceBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_price, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.apply {

            backBTN.setOnClickListener{
                Navigation.findNavController(it).popBackStack()
            }

            nextBTN.setOnClickListener{
                Navigation.findNavController(it).navigate(R.id.action_priceFragment_to_confirmationFragment)
            }

        }
    }
}