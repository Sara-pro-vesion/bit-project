import { useEffect, useState, useRef } from "react";

export default function DonationForm({ onSubmit, initialValues = {}, submitLabel }) {
  const [image, setImage] = useState(initialValues.image ?? null);
  const [preview, setPreview] = useState(
    initialValues.image
      ? typeof initialValues.image === "string"
        ? initialValues.image
        : URL.createObjectURL(initialValues.image)
      : null
  );
  const [form, setForm] = useState({
    typeOfDonation: initialValues.typeOfDonation ?? "",
    quantity: initialValues.quantity ?? "",
    description: initialValues.description ?? "",
    contactInfo: initialValues.contactInfo ?? "",
    id: initialValues.id,
  });

  useEffect(() => {
    setForm({
      typeOfDonation: initialValues.typeOfDonation ?? "",
      quantity: initialValues.quantity ?? "",
      description: initialValues.description ?? "",
      contactInfo: initialValues.contactInfo ?? "",
      id: initialValues.id,
    });
    setImage(initialValues.image ?? null);
    setPreview(
      initialValues.image
        ? typeof initialValues.image === "string"
          ? initialValues.image
          : URL.createObjectURL(initialValues.image)
        : null
    );
  }, [initialValues]);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    onSubmit?.({ ...form, image });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-lg">
      <div className="flex gap-6 items-start">

        {/* Image upload */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="w-36 min-w-[9rem] h-36 bg-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors overflow-hidden"
        >
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-600 text-sm font-medium">import</span>
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
          {[
            { name: "typeOfDonation", placeholder: "type of donation" },
            { name: "quantity",       placeholder: "quantity", type: "number" },
            { name: "description",    placeholder: "description" },
            { name: "contactInfo",    placeholder: "contact info" },
          ].map(({ name, placeholder, type = "text" }) => (
            <input
              key={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-500 transition-colors"
            />
          ))}
        </div>

      </div>


      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="px-8 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {submitLabel ?? (form.id ? 'save' : 'done')}
        </button>
      </div>
    </div>
  );
}