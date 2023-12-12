"use server";

export const registerNewUser = async (data) => {
  console.log("req gone");
  try {
    const res = await fetch(`${process.env.Server_URL}/api/register`, {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
      headers: {
        "content-type": "application/json",
      },
    });
    const returnData = res.json();
    return returnData;
  } catch (error) {
    console.log("error", error);
  }
};
