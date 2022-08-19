package com.vandit.vike.models

data class BikeData(
    val renterName: String,
    val block: String,
    val roomNo: Int,
    val phoneNo: String,
    val bikeName: String,
    val bikeCompany: String,
    val bikeDetails: String,
    val amount: Int,
    val image: String
){
    var isExpandable = false
}