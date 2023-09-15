const cloudinary = require('cloudinary').v2;

const downloadCloudinary = async(name, lastName) => {
// Configura tus credenciales de Cloudinary
cloudinary.config({
  cloud_name: 'dhmsbud0o',
  api_key: '448615133128355',
  api_secret: 'qIXSDIUW6mGPzp3GuL0FKSyLy44',
});

  const docxPublicId = `filesZucca/${name} ${lastName}.docx`;

  try {
    // Si no se produce un error, significa que el archivo .docx existe
    // Genera la URL segura y firmada para el archivo .docx
    const url = cloudinary.url(docxPublicId, {
      secure: true,
      sign_url: true,
      resource_type: 'raw',
    });

    return url;
  } catch (error) {
      return error.message
  };
};


module.exports = {
    downloadCloudinary,
};