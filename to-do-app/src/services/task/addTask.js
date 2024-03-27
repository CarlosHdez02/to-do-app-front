export async function addTask(payload,onSuccess) {
  const { title } = payload;
  try {
    const response = await fetch("http://localhost:3000/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: title,
      }),
    });

    if (response.ok) {
      return response.status;
    }
    console.error("failed to save task");
  } catch (error) {
    console.error("Error saving task", error);
  }
}
