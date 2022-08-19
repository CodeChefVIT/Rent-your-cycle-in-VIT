package com.vandit.vike.fragments

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.vandit.vike.HomeActivity
import com.vandit.vike.R
import com.vandit.vike.databinding.FragmentLoginBinding

class LoginFragment : Fragment() {
    lateinit var binding: FragmentLoginBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_login, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.apply {
            loginBTN.setOnClickListener {
//                Navigation.findNavController(it).navigate(R.id.action_loginFragment_to_homeFragment)
                val intent = Intent(activity, HomeActivity::class.java)
                startActivity(intent)
            }
        }
    }
}