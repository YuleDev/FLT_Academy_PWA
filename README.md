# FLT Academy Student Portal (PWA)
**An Internet-Independent Aviation Operations Management Tool**

### 🚀 [Launch FLT Portal](https://yuledev.github.io/FLT_Academy_PWA/Views/HTML/index.html)

---

## 📱 iPad Installation
For the best experience on an iPad mini, follow these steps to install the portal as a native application:
1. Open the **[Launch Link](https://yuledev.github.io/FLT_Academy_PWA/Views/HTML/index.html)** in Safari.
2. Tap the **Share** icon (square with an up arrow).
3. Scroll down and select **'Add to Home Screen'**.
4. The portal will now appear on your home screen with a professional icon and will function 100% offline.

---

## Overview
This Progressive Web App (PWA) is designed specifically for student pilots and instructors at **FLT Academy**. Recognizing that critical flight operations—such as **Weight & Balance** and **Dispatch**—often occur in low-connectivity environments like hangars or remote ramps at **KBTF** and **KSPK**, this tool ensures 100% operational uptime without a data connection.

## Key Features
* **Real-Time Weight & Balance Engine**: Dynamically calculates aircraft Total Weight and Center of Gravity (CG) based on DA-40 POH constants ($Weight \times Arm = Moment$).
* **Internet Independence**: Utilizes a **Service Worker** to pre-cache the application shell, allowing the portal to load instantly even in Airplane Mode.
* **Fail-Safe Persistence**: Implements an **IndexedDB** sync queue to store complex reports (ASAP, Checkrides, Dispatch) locally until the device regains internet access.
* **iOS Native Aesthetic**: Scaled and optimized for the **iPad mini**, featuring large touch targets and a "Home Screen" grid layout.

## Technical Stack
* **Frontend**: Vanilla JavaScript (SPA Architecture), CSS Grid & Flexbox.
* **Storage**: IndexedDB for structured offline data.
* **PWA**: Service Worker API (Cache-First strategy) and Background Sync API.
* **Icons**: Custom inline SVGs for zero-latency rendering.

## Aviation Logic
The portal handles specific aviation workflows:
1. **Dispatch**: Validates if the aircraft is within the **6.4.4 Permissible CG Range**.
2. **Safety**: Direct ASAP reporting with anonymous submission support.
3. **Training**: Automated Stage Check and New Instructor request templates.

---
*Created by Kole Alexander Ervine*
