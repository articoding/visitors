import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const InternForm = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phoneNumber: '',
    department: '',
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      const departmentCollection = collection(db, 'departments');
      const departmentSnapshot = await getDocs(departmentCollection);
      const departmentList = departmentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDepartments(departmentList);
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let profilePhotoUrl = '';
      
      // Upload the profile photo to Firebase Storage
      if (profilePhoto) {
        const photoRef = ref(storage, `profilePhotos/${profilePhoto.name}-${Date.now()}`);
        await uploadBytes(photoRef, profilePhoto);
        profilePhotoUrl = await getDownloadURL(photoRef);
      }

      // Add the form data to Firestore, including the photo URL if available
      const internsCollection = collection(db, 'interns');
      await addDoc(internsCollection, {
        ...formData,
        profilePhotoUrl, // Store the photo URL in Firestore
      });

      alert('Intern registered successfully!');
    } catch (error) {
      console.error("Error adding intern: ", error);
      alert('Failed to register intern');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700 font-medium">Foto de perfil</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Nombre</label>
        <input
          type="text"
          name="name"
          placeholder="Nombre del practicante"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Apellidos</label>
        <input
          type="text"
          name="lastName"
          placeholder="Apellidos del practicante"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Número de celular</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Número de celular del practicante"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Departamento</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          required
        >
          <option value="">Selecciona un departamento</option>
          {departments.map(department => (
            <option key={department.id} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 w-full">
        Registrar
      </button>
    </form>
  );
};

export default InternForm;
