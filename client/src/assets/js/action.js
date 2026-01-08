export const gameAction = async ({ request }) => {
  const data = await request.formData();

  const submissions = {
    character: data.get("character"),
    clickX: data.get("clickX"),
    clickY: data.get("clickY"),
  };

  console.log(submissions);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/game/play`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissions),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    return error.info;
  }

  return response.json();
};
