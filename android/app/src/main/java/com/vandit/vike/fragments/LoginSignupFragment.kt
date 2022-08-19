package com.vandit.vike.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.NavController
import androidx.navigation.Navigation
import com.vandit.vike.R
import com.vandit.vike.databinding.FragmentLoginSignupBinding

class LoginSignupFragment : Fragment() {
    lateinit var binding: FragmentLoginSignupBinding
    lateinit var navController: NavController

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_login_signup, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.apply {
            loginBTN.setOnClickListener {
                Navigation.findNavController(it).navigate(R.id.action_loginSignupFragment_to_loginFragment)
            }

            registerBTN.setOnClickListener {
                Navigation.findNavController(it).navigate(R.id.action_loginSignupFragment_to_signupFragment2)
            }
        }
    }
}