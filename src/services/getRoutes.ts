interface Payload {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
}

const getRoutes = async (payload: Payload): Promise<GetRoutesResponse> => {
  try {
    const response = await fetch("/api/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "get routes failed");
    }

    const data = await response.json();

    return {
      ...data,
      code: response.status,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("get routes API failed: Unknown error");
    }
  }
};

export default getRoutes;
