"use server";
export const loginUser = async (formData) => {
  console.log("login req gone");
  try {
    const res = await fetch(`${process.env.Server_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
      cache: "no-store",
    });
    const returnData = res.json();
    return returnData;
  } catch (error) {
    console.log("error", error);
  }
};
