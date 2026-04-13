import { useEffect, useState, useRef } from "react";

export default function DonationForm({ onSubmit, initialValues = {}, submitLabel }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    initialValues.image ? initialValues.image : null
  );
  
  const [form, setForm] = useState({
    typeOfDonation: initialValues.typeOfDonation ?? "",
    quantity: initialValues.quantity ?? "",
    description: initialValues.description ?? "",
    contactInfo: initialValues.contactInfo ?? "",
    _id: initialValues._id,
  });

  useEffect(() => {
    setForm({
      typeOfDonation: initialValues.typeOfDonation ?? "",
      quantity: initialValues.quantity ?? "",
      description: initialValues.description ?? "",
      contactInfo: initialValues.contactInfo ?? "",
      _id: initialValues._id,
    });
    setPreview(initialValues.image ?? null);
  }, [initialValues]);

  const fileInputRef = useRef(null);

const handleImageChange = (e) => {
  const file = e.target.files;

  if (file) {
    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl); 
    
  } else {
    console.log("No file selected or selection cancelled");
  }
};

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    // We use FormData for MERN file uploads
    const data = new FormData();
    data.append("typeOfDonation", form.typeOfDonation);
    data.append("quantity", form.quantity);
    data.append("description", form.description);
    data.append("contactInfo", form.contactInfo);
    
    if (image) {
      data.append("image", image); // The 'image' key must match the backend multer config
    }

    onSubmit?.(data);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-lg">
      <div className="flex gap-6 items-start">
        <div
          onClick={() => fileInputRef.current.click()}
          className="w-36 min-w-[9rem] h-36 bg-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors overflow-hidden"
        >
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-600 text-sm font-medium">import image</span>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <div className="flex flex-col gap-3 flex-1">
          <input
            name="typeOfDonation"
            placeholder="type of donation"
            value={form.typeOfDonation}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          <input
            name="quantity"
            type="number"
            placeholder="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          <textarea
            name="description"
            placeholder="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 h-20"
          />
          <input
            name="contactInfo"
            placeholder="contact info (phone/email)"
            value={form.contactInfo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {submitLabel ?? (form._id ? 'save changes' : 'create donation')}
        </button>
      </div>
    </div>
  );
}