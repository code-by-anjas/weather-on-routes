# Weather on Route

Realtime Weather Insights Along Your Travel Route

Weather on Route adalah aplikasi web yang menampilkan informasi cuaca di sepanjang rute perjalanan secara otomatis menggunakan Google Maps Platform API.  
User hanya perlu menentukan origin dan destination, lalu aplikasi akan menghitung titik sampling di sepanjang rute dan menampilkan data cuaca untuk setiap titik tersebut.

Dibangun menggunakan Next.js 16.0.7 dengan Typescript dan PNPM.

---

## Features

### 1. Route Visualization

- Menampilkan rute perjalanan dari Google Directions API.
- Polyline decoding otomatis menggunakan Google Maps Geometry Library.

### 2. Dynamic Weather Sampling

Aplikasi memiliki dua mode utama untuk menentukan titik sampling:

**Sampling by Distance**

- Contoh: setiap 3 km mengambil data cuaca terbaru.
- Interval dapat diatur melalui UI slider.

**Sampling by Time**

- Contoh: setiap 30 menit perjalanan mengambil cuaca pada titik estimasi waktu tersebut.
- Menggunakan total duration dari Directions API.

### 3. Configurable Sampling Card

- User hanya dapat memilih satu mode sampling (distance/time) pada satu waktu.
- Masing-masing mode memiliki slider interval yang independen.
- Global state ditangani oleh Sampling Context.

### 4. Weather API Integration

- Mengambil data cuaca untuk setiap titik sampling.
- Format data dibersihkan menjadi struktur CleanWeatherData.

### 5. Modular Architecture

- Hooks terpisah untuk dua tipe sampling:
  - useRouteSampling (distance-based)
  - useRouteTimeSampling (time-based)
- Context global untuk state sampling:
  - mode
  - distance interval
  - time interval

---

## Tech Stack

| Area            | Teknologi                    |
| --------------- | ---------------------------- |
| Framework       | Next.js 16.0.7               |
| Bahasa          | Typescript                   |
| Styling         | TailwindCSS + shadcn/ui      |
| Maps SDK        | Google Maps JavaScript API   |
| Directions      | Google Directions API        |
| Utilities       | Google Maps Geometry Library |
| State           | React Context                |
| Package Manager | PNPM                         |

---
