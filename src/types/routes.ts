// Structure untuk satu object Route dari Google
interface GoogleRoute {
  // Google mengembalikan duration dalam format string "seconds" (contoh: "1800s")
  duration: string;
  distanceMeters: number;
  polyline: {
    encodedPolyline: string;
  };
}

// Structure response raw dari Google API
interface GoogleRoutesApiResponse {
  routes: GoogleRoute[];
}

// Structure final return dari service kamu (ditambah properti 'code')
interface GetRoutesResponse extends GoogleRoutesApiResponse {
  code: number;
}
