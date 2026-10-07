const uploadImageToClodinary = async (file) => {
  const upload_preset = (import.meta.env?.VITE_UPLOAD_PRESET || "user_upload").trim();
  const cloud_name = (import.meta.env?.VITE_CLOUD_NAME || "yashika123").trim();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);
  formData.append("cloud_name", cloud_name);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  if (data && (data.secure_url || data.url)) {
    data.url = data.secure_url || data.url;
  }
  return data;
};

export default uploadImageToClodinary;