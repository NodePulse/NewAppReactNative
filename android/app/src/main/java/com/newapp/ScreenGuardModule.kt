package com.newapp

import android.util.Log
import android.view.WindowManager
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil

class ScreenGuardModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "ScreenGuard"

    @ReactMethod
    fun enable() {
        UiThreadUtil.runOnUiThread {
            try {
                val activity = reactApplicationContext.currentActivity
                if (activity != null) {
                    activity.window.addFlags(WindowManager.LayoutParams.FLAG_SECURE)
                    Log.d("ScreenGuard", "FLAG_SECURE enabled successfully")
                } else {
                    Log.w("ScreenGuard", "Cannot enable FLAG_SECURE: currentActivity is null")
                }
            } catch (e: Exception) {
                Log.e("ScreenGuard", "Error enabling FLAG_SECURE", e)
            }
        }
    }

    @ReactMethod
    fun disable() {
        UiThreadUtil.runOnUiThread {
            try {
                val activity = reactApplicationContext.currentActivity
                if (activity != null) {
                    activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
                    Log.d("ScreenGuard", "FLAG_SECURE disabled successfully")
                } else {
                    Log.w("ScreenGuard", "Cannot disable FLAG_SECURE: currentActivity is null")
                }
            } catch (e: Exception) {
                Log.e("ScreenGuard", "Error disabling FLAG_SECURE", e)
            }
        }
    }
}
