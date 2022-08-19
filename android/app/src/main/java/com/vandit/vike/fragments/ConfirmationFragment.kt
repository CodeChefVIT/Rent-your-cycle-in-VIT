package com.vandit.vike.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.vandit.vike.R
import com.vandit.vike.databinding.FragmentConfirmationBinding

class ConfirmationFragment : Fragment() {
    lateinit var binding:FragmentConfirmationBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(layoutInflater,
            R.layout.fragment_confirmation, container, false)
        return binding.root
    }
}