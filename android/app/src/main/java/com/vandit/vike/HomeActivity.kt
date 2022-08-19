package com.vandit.vike

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.vandit.vike.databinding.ActivityHomeBinding
import com.vandit.vike.fragments.HistoryFragment
import com.vandit.vike.fragments.HomeFragment
import com.vandit.vike.fragments.ProfileFragment

class HomeActivity : AppCompatActivity() {
    lateinit var binding: ActivityHomeBinding
    private var currentFragment: Fragment = HomeFragment()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityHomeBinding.inflate(layoutInflater)

        loadFragment(HomeFragment())

        binding.bottomNavbar.setOnItemSelectedListener {
            when(it.itemId){
                R.id.home -> loadFragment(HomeFragment())
                R.id.history -> loadFragment(HistoryFragment())
                R.id.profile -> loadFragment(ProfileFragment())
            }

            true
        }

        setContentView(binding.root)
    }

    private  fun loadFragment(fragment: Fragment){
        if(currentFragment != fragment){
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.nav_host_fragment_2, fragment)
                addToBackStack(null)
                commit()
            }
        }
        currentFragment = fragment
    }
}