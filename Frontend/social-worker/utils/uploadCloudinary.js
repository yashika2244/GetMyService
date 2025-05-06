const upload_preset =import.meta.env.VITE_UPLOAD_PRESET
const cloud_name =import.meta.env.VITE_CLOUD_NAME

const uploadImageToClodinary=async file=>{
    const formData =new FormData()
    formData .append('file',file)
    formData .append('upload_preset',upload_preset)
    formData .append('cloud_name',cloud_name)
    const res= await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
    
        method:"post",
        body: formData
    });


    const data =await res.json();
    return data
}
export default uploadImageToClodinary